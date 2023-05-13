import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {themes} from "@/modules/themes/utils/themes";
import ThemeSample from "./ThemeSample";
import styles from "../../../styles/Themes.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";

const variants = {
    enter: {
        scale: 1,
        opacity: 1
    },
    exit: {
        scale: 0.8,
        opacity: 0,
    }
}

const Themes = () => {
    const {active} = useSelector(selectTheme)

    return (
        <motion.div
            style={{background: active.description}}
            transition={{stiffness: 300, duration: 0.3, delay: 0.3}}
            className={styles.main}
            initial={variants.exit} animate={variants.enter} exit={variants.exit}
        >
            {themes.map(t => <ThemeSample key={t.name} theme={t}/>)}
        </motion.div>
    );
};

export default Themes;