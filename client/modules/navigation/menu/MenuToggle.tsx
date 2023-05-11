import * as React from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Menu.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import {ComponentPropsWithoutRef} from "react";

const Path: React.FC<any> = (props) => {
    const {active} = useSelector(selectTheme);

    return (
        <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke={active.text}
            strokeLinecap="round"
            {...props}
        />
    );
};

interface MenuToggleProps {
    toggle: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
    <button className={styles.button} onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
            />
        </svg>
    </button>
);

export default MenuToggle;