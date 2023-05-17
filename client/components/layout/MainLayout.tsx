import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '../../styles/MainLayout.module.scss';
import styled, {ThemeProvider} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme, setTheme, setThemes} from "@/modules/themes/redux/themeSlice";
import RoundButton from "@/components/buttons/RoundButton";
import ScrollTo from "@/components/icons/ScrollTo";
import {DefaultTheme} from "styled-components/native/dist/types";

interface MainLayoutProps {
    children: React.ReactNode;
}

const StyledLayout = styled.div`
  background: ${props => props.theme.bodyBackground};
`

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    const {active, themes} = useSelector(selectTheme);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.querySelector('body');
        body?.style.setProperty("--scrollbar-background", active.bodyBackground)
        body?.style.setProperty("--scrollbar-thumb-background", active.subGradient.gradient)
    }, [active])

    return (
        <ThemeProvider theme={active}>
            <StyledLayout className={styles.main}>
                {children}
            </StyledLayout>
        </ThemeProvider>
    );
};

export default MainLayout;