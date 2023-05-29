import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '../../../styles/PathExample.module.scss';
import {motion} from "framer-motion";
import {
    container,
    leftCross,
    leftEye,
    rightCross,
    rightEye,
    smile
} from "@/modules/animations/utils/PathExampleVariants";

const PathExample = () => {
    const [animation, setAnimation] = useState<'peace' | 'warn' | 'angry' | 'dead' | null>(null);
    const [multiplier, setMultiplier] = useState<number>(1)
    const timeout = useRef<any>(null);

    useEffect(() => {
        if(animation === 'angry') {
            timeout.current = setTimeout(() => {
                setAnimation('dead')
            }, 5000)
        }
        if(animation === 'peace' && timeout.current) {
            clearTimeout(timeout.current)
        }
    }, [animation])

    const condition = (width: number) => {
        if(width <= 385) {
            setMultiplier(0.7) //210:300
        } else if(width <= 475) {
            setMultiplier(0.8) //240:300
        }
    }

    let onResize = useCallback(() => {
        condition(window.innerWidth)
    }, [])

    useEffect(() => {
        condition(window.innerWidth)
        setAnimation('peace')
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.sample}
                onHoverStart={() => {animation !== 'dead' && setAnimation('warn')}}
                onHoverEnd={() => {animation !== 'dead' && setAnimation('peace')}}
                onTapStart={() => {animation !== 'dead' && setAnimation('angry')}}
                onTapCancel={() => {animation !== 'dead' && setAnimation('warn')}}
                variants={container}
                animate={animation ? animation : {}}
            >
                <svg width={'100%'} height={'100%'}>
                    <motion.path
                        name={"right eye"}
                        fill={"transparent"}
                        stroke={"black"}
                        strokeWidth={'4'}
                        variants={rightEye(multiplier)}
                    />
                    <motion.path
                        fill={"transparent"}
                        stroke={"black"}
                        strokeWidth={'4'}
                        variants={rightCross(multiplier)}
                    />
                    <motion.path
                        name={"left eye"}
                        fill={"transparent"}
                        stroke={"black"}
                        strokeWidth={'4'}
                        variants={leftEye(multiplier)}
                    />
                    <motion.path
                        fill={"transparent"}
                        stroke={"black"}
                        strokeWidth={'4'}
                        variants={leftCross(multiplier)}
                    />
                    <motion.path
                        name={"smile"}
                        stroke={'black'}
                        variants={smile(multiplier)}
                        fill={'transparent'}
                        strokeWidth={'4'}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default PathExample;