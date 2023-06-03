import React from 'react';
import blockStyles from "../../../styles/Block.module.scss";
import {motion} from "framer-motion";
import styles from "../../../styles/GestureExample.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";

const GestureExample = () => {
    const {active} = useSelector(selectTheme);

    return (
        <div className={blockStyles.pageExample}>
            <motion.div
                className={styles.cube}
                style={{background: active.text}}
                transition={{stiffness: 200}}
                whileHover={{
                    scale: 0.9,
                    rotate: '45deg'
                }}
                whileTap={{
                    scale: 0.8,
                    rotate: '90deg'
                }}
            />
        </div>
    );
};

export default GestureExample;