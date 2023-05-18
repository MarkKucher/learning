import React, {useCallback, useEffect, useState} from 'react';
import RoundButton from "@/components/buttons/RoundButton";
import ScrollTo from "@/components/icons/ScrollTo";

const ScrollToTheTop = () => {
    const [scrollY, setScrollY] = useState<number>(0)
    const [prevScrollY, setPrevScrollY] = useState<number>(0)
    const [shouldShowArrowUp, setShouldShowArrowUp] = useState<boolean>(false)
    const [scrollTimeout, setScrollTimeout] = useState<any>(null)

    let onScroll: any;
    onScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY)
    }, []);

    useEffect(() => {
        setPrevScrollY(scrollY)
        if(scrollTimeout) {
            clearTimeout(scrollTimeout)
        }
        if(scrollY > prevScrollY && !scrollTimeout) {
            setScrollTimeout(setTimeout(() => {
                setShouldShowArrowUp(true)
            }, 1000))
        }
        if(scrollY < prevScrollY) setShouldShowArrowUp(false)
    }, [scrollY])

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <div>
            {shouldShowArrowUp && <RoundButton position={"fixed"} right={'15px'} top={'45vh'}>
                <ScrollTo isArrowUp={true} x={0} y={0}/>
            </RoundButton>}
        </div>
    );
};

export default ScrollToTheTop;