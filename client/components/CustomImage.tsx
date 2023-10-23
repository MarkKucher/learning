import React, {ComponentPropsWithoutRef, useCallback, useEffect, useState} from 'react';
import Image from "next/image";

const CustomImage: React.FC<ComponentPropsWithoutRef<typeof Image>> = ({...props}) => {
    const [width, setWidth] = useState(Number(props.width) || 300)
    const [height, setHeight] = useState(Number(props.height) || 300)

    const relation = width / height;

    const condition = (screenWidth: number) => {
        const compareTo = props.width ? props.width : width;
        if(screenWidth < compareTo) {
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
        <Image
            {...props}
            width={width}
            height={height}
        />
    );
};

export default CustomImage;