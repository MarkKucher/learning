import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '../../styles/MainLayout.module.scss';
import styled, {ThemeProvider} from "styled-components";
import {useSelector} from "react-redux";
import {selectTheme, setTheme} from "@/modules/themes/redux/themeSlice";
import RoundButton from "@/components/buttons/RoundButton";
import ScrollTo from "@/components/icons/ScrollTo";

interface MainLayoutProps {
    children: React.ReactNode;
}

const StyledLayout = styled.div`
  background: ${props => props.theme.bodyBackground};
`

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    const {active} = useSelector(selectTheme);
    // const [scrollY, setScrollY] = useState<number>(0)
    // const [prevScrollY, setPrevScrollY] = useState<number>(0)
    const [shouldShowArrowUp, setShouldShowArrowUp] = useState<boolean>(false)
    // const [scrollTimeout, setScrollTimeout] = useState<any>(null)

    useEffect(() => {
        const body = document.querySelector('body');
        body?.style.setProperty("--scrollbar-background", active.bodyBackground)
        body?.style.setProperty("--scrollbar-thumb-background", active.subGradient.gradient)
    }, [active])

    // let onScroll: any;
    // onScroll = useCallback(() => {
    //     const currentScrollY = window.scrollY;
    //     setScrollY(currentScrollY)
    // }, []);

    // useEffect(() => {
    //     setPrevScrollY(scrollY)
    //     if(scrollTimeout) {
    //         clearTimeout(scrollTimeout)
    //     }
    //     if(scrollY > prevScrollY && !scrollTimeout) {
    //         setScrollTimeout(setTimeout(() => {
    //             setShouldShowArrowUp(true)
    //         }, 1000))
    //     }
    //     if(scrollY < prevScrollY) setShouldShowArrowUp(false)
    // }, [scrollY])

    // useEffect(() => {
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => {
    //         window.removeEventListener("scroll", onScroll, { passive: true });
    //     }
    // }, []);

    return (
        <ThemeProvider theme={active}>
            <StyledLayout className={styles.main}>
                {children}
                {shouldShowArrowUp && <RoundButton position={"fixed"} right={'15px'} top={'45vh'}>
                    <ScrollTo withoutSelfAlignment isArrowUp={true} x={0} y={0}/>
                </RoundButton>}
            </StyledLayout>
        </ThemeProvider>
    );
};

export default MainLayout;