import React, {useState} from 'react';
import styles from '../../../styles/AnimationExample.module.scss';
import PlayAndPause from "@/components/icons/PlayAndPause";
import { motion } from 'framer-motion';
import styled from "styled-components";

const AnimatedObject = styled(motion.div)`
  background: ${props => props.theme.text};
`

const AnimationExample = () => {
    const [shouldShowAnimation, setShouldShowAnimation] = useState<boolean>(false);

    const animation = {
        play: {
            rotate: [0, 360],
            scale: [1, 0.8, 1],
            borderRadius: ['20%', '10%', '20%'],
            boxShadow: ['0 0 20px #000000', '0 0 40px #FFFFFF', '0 0 20px #000000'],
            transition: {
                repeat: Infinity,
                duration: 2,
            }
        },
        pause: {
            borderRadius: '20%',
            boxShadow: '0 0 20px #000000',
            scale: 1,
        }
    }

    return (
        <div className={styles.block}>
            <AnimatedObject animate={shouldShowAnimation ? 'play' : 'pause'} variants={animation} className={styles.cube}/>
            <PlayAndPause shouldPlay={shouldShowAnimation} changeState={setShouldShowAnimation}/>
        </div>
    );
};

export default AnimationExample;