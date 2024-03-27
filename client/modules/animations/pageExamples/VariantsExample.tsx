import React, {useCallback, useEffect, useState} from 'react';
import styles from "../../../styles/VariantsExample.module.scss";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import {loadSeveralItems} from "@/helpers/loadSeveralItems";
import {motion} from "framer-motion";
import IsVisibleIcon from "@/components/icons/IsVisibleIcon";

const container = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    },
}

const items = {
    hidden: {
        scale: 0.7,
        borderRadius: '50%',
        rotate: '-90deg',
        transition: {
            delay: 0.2
        }
    },
    visible: {
        scale: 1,
        borderRadius: '10%',
        rotate: '0deg',
        transition: {
            duration: 0.3,
            delayChildren: 1
        }
    }
}

const mockContent = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.1
        }
    },
    visible: {
        opacity: 1
    }
}

const VariantsExample = () => {
    const {active} = useSelector(selectTheme);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [times, setTimes] = useState<number>(9);

    const condition = (width: number) => {
        console.log(width)
        if(width <= 475) {
            setTimes(4)
        } else if(width <= 500) {
            setTimes(6)
        } else {
            setTimes(9)
        }
    }

    let onResize = useCallback(() => {
        condition(window.innerWidth)
    }, [])

    useEffect(() => {
        condition(window.innerWidth)
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div className={styles.block}>
            <motion.div
                initial={false}
                variants={container}
                animate={isHidden ? 'hidden' : 'visible'}
                style={{background: active.text}}
                className={styles.container}
                transition={{stiffness: 50}}
            >
                {loadSeveralItems(
                    <motion.div
                        variants={items}
                        className={styles.item}
                        style={{background: active.subGradient.gradient}}
                    >
                        <motion.div variants={mockContent} className={styles.mockContent} style={{background: active.description}}/>
                        <motion.div variants={mockContent} className={styles.mockContent} style={{background: active.description}}/>
                        <motion.div variants={mockContent} className={styles.mockContent} style={{background: active.description}}/>
                    </motion.div>, times
                    )
                }
            </motion.div>
            <IsVisibleIcon isHidden={isHidden} setIsHidden={setIsHidden}/>
        </div>
    );
};

export default VariantsExample;