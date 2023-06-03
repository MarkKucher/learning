import React, {useRef} from 'react';
import blockStyles from "../../../styles/Block.module.scss";
import {motion} from "framer-motion";
import styles from "../../../styles/DragExample.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";

const DragExample = () => {
    const constraintsRef = useRef(null);
    const {active} = useSelector(selectTheme);

    return (
        <div className={blockStyles.pageExample}>
            <div ref={constraintsRef} className={styles.constraints}>
                <motion.div
                    style={{background: active.text}}
                    className={styles.circle}
                    drag
                    dragConstraints={constraintsRef}
                />
            </div>
        </div>
    );
};

export default DragExample;