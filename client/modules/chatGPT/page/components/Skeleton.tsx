import React, {useCallback, useEffect, useState} from "react";
import styles from "@/styles/Skeleton.module.scss";
import Shimmer from "@/modules/chatGPT/page/components/Shimmer";

interface SkeletonProps {
    width: number;
    height: number;
}

const Skeleton: React.FC<SkeletonProps> = (props) => {
    const [width, setWidth] = useState(Number(props.width) || 300)
    const [height, setHeight] = useState(Number(props.height) || 300)

    const condition = (screenWidth: number) => {
        const compareTo = props.width ? props.width : 300;
        if(screenWidth - 10 < compareTo) {
            const newWidth = screenWidth - 10
            setWidth(newWidth)
            setHeight(newWidth)
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
        <div
            style={{
                width: window.innerWidth - 10 < width ? window.innerWidth - 10 : width,
                height
            }}
            className={styles.skeleton}
        >
            <Shimmer/>
        </div>
    );
};

export default Skeleton;