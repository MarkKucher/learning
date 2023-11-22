import React, {useEffect} from 'react';
import styles from '../../styles/MainLayout.module.scss';
import styled, {ThemeProvider} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import Head from "next/head";

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const StyledLayout = styled.div`
  background: ${props => props.theme.bodyBackground};
`

const MainLayout: React.FC<MainLayoutProps> = ({children, title = 'Learning'}) => {
    const {active, themes} = useSelector(selectTheme);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.querySelector('body');
        body?.style.setProperty("--scrollbar-background", active.bodyBackground)
        body?.style.setProperty("--scrollbar-thumb-background", active.subGradient.gradient)
    }, [active])

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <ThemeProvider theme={active}>
                <StyledLayout className={styles.main}>
                    {children}
                </StyledLayout>
            </ThemeProvider>
        </div>
    );
};

export default MainLayout;