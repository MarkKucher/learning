import React, {useRef} from 'react';
import blockStyles from "../../../styles/Block.module.scss";
import {useScroll, useTransform, motion} from "framer-motion";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import styles from "../../../styles/ScrollExample.module.scss";

const ScrollExample = () => {
    const {active} = useSelector(selectTheme);
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 2]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const move = useTransform(scrollYProgress, [0, 1], [30, 0]);

    return (
        <div className={blockStyles.pageExample}>
            <motion.div
                className={styles.outer}
                style={{scale, background: active.text}}
            >
                <motion.div
                    className={styles.inner}
                    style={{
                        rotate,
                        background: active.subGradient.gradient,
                        bottom: move,
                        right: move
                    }}
                />
            </motion.div>
        </div>
    );
};

export default ScrollExample;