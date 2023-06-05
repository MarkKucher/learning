import React, {useRef} from 'react';
import blockStyles from "../../../styles/Block.module.scss";
import {motion, useMotionValue, useTransform} from "framer-motion";
import styles from "../../../styles/DragExample.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";

const DragExample = () => {
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const innerBackground = useTransform(x, [-150, 0, 150], ['rgb(200, 50, 50)', 'rgb(50, 200, 50)', 'rgb(50, 50, 200)'])
    const outerBackground = useTransform(y, [-150, 0, 150], ['rgb(50, 200, 50)', 'rgb(50, 50, 200)', 'rgb(200, 50, 50)'])

    return (
        <div className={blockStyles.pageExample}>
            <motion.div
                style={{background: outerBackground, borderColor: innerBackground}}
                ref={constraintsRef}
                className={styles.constraints}
            >
                <motion.div
                    style={{background: innerBackground, x, y}}
                    className={styles.circle}
                    drag
                    dragConstraints={constraintsRef}
                />
            </motion.div>
        </div>
    );
};

export default DragExample;