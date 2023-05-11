import * as React from "react";
import { useRef } from "react";
import {AnimatePresence, motion, sync, useCycle} from "framer-motion";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import {useDimensions} from "@/hooks/useDimensions";
import styles from "../../../styles/Menu.module.scss";
import styled, {DefaultTheme} from "styled-components";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import {useSelector} from "react-redux";

const sidebar = (theme: DefaultTheme) => ({
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px calc(45vh + 22.5px))`,
        background: `${theme.description}`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px calc(45vh + 22.5px))",
        background: `${theme.description}`,
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

    return (
        <motion.nav
            className={styles.nav}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div style={{backgroundColor: active.description}} className={styles.background} variants={sidebar(active)} />
            <AnimatePresence>
                {isOpen && <Navigation/>}
            </AnimatePresence>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};
