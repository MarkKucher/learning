import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useCycle} from "framer-motion";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import {useDimensions} from "@/hooks/useDimensions";
import styles from "../../../styles/Menu.module.scss";
import {DefaultTheme} from "styled-components";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import {useSelector} from "react-redux";

const sidebar = (active: DefaultTheme) => ({
    open: (height = 1000) => ({
        borderRight: `2px solid ${active.text}`,
        clipPath: `circle(${height * 2 + 200}px at 40px calc(45vh + 22.5px))`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px calc(45vh + 22.5px))",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
});

export const Menu = () => {
    const {active} = useSelector(selectTheme)
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const [shouldChangeBackground, setShouldChangeBackground] = useState<boolean>(false)

    useEffect(() => {
        setShouldChangeBackground(true)
        setTimeout(() => {
            setShouldChangeBackground(false)
        }, 2000)
    }, [active])

    return (
        <motion.nav
            className={styles.nav}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div
                animate={shouldChangeBackground && {
                    background: active.description
                }}
                className={styles.background}
                variants={sidebar(active)}
            />
            <AnimatePresence>
                {isOpen && <Navigation/>}
            </AnimatePresence>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};
