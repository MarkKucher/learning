import React, {ComponentPropsWithoutRef, useCallback, useEffect, useState} from 'react';
import Image from "next/image";
import Loader from "@/components/Loader";
import styles from "@/styles/CustomImage.module.scss";

interface CustomImageProps extends ComponentPropsWithoutRef<typeof Image> {
    isLoading?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({isLoading, ...props}) => {
    const [width, setWidth] = useState(Number(props.width) || 700)
    const [height, setHeight] = useState(Number(props.height) || 700)

    const relation = width / height;

    const condition = (screenWidth: number) => {
        const compareTo = props.width ? props.width : 300;
        if(screenWidth - 10 < compareTo) {
            const newWidth = screenWidth - 10
            setWidth(newWidth)
            setHeight(newWidth / relation)
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
        <>
            {!isLoading ? <Image
                {...props}
                width={window.innerWidth - 10 < width ? window.innerWidth - 10 : width}
                height={height}
            /> : <div className={styles.skeleton} style={{width, height}}>
                <Loader/>
            </div>}
        </>
    );
};

export default CustomImage;