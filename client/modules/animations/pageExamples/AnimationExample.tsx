import React, {useState} from 'react';
import styles from '../../../styles/AnimationExample.module.scss';
import PlayAndPause from "@/components/icons/PlayAndPause";
import { motion } from 'framer-motion';
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";

const AnimationExample = () => {
    const [shouldShowAnimation, setShouldShowAnimation] = useState<boolean>(false);
    const {active} = useSelector(selectTheme);

    const animation = {
        play: {
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            borderRadius: ['40%', '30%', '40%'],
            transition: {
                repeat: Infinity,
                duration: 2,
            }
        },
        pause: {
            borderRadius: '30%',
            scale: 1,
        }
    }

    return (
        <div className={styles.block}>
            <motion.div style={{background: active.text}} animate={shouldShowAnimation ? 'play' : 'pause'} variants={animation} className={styles.cube}/>
            <PlayAndPause shouldPlay={shouldShowAnimation} changeState={setShouldShowAnimation}/>
        </div>
    );
};

export default AnimationExample;