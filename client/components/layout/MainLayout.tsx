import React, {useEffect} from 'react';
import styles from '../../styles/MainLayout.module.scss';
import styled, {ThemeProvider} from "styled-components";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import Head from "next/head";
import Header from "@/modules/header/Header";

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const StyledLayout = styled.div`
  background: ${props => props.theme.bodyBackground};
`

const MainLayout: React.FC<MainLayoutProps> = ({children, title = 'Learning'}) => {
    const {active} = useSelector(selectTheme);

    useEffect(() => {
        const body = document.querySelector('body');
        body?.style.setProperty("--scrollbar-background", active.bodyBackground)
        body?.style.setProperty("--scrollbar-thumb-background", active.subGradient.gradient)
    }, [active])

    return (
        <ThemeProvider theme={active}>
            <StyledLayout className={styles.main}>
                <Head>
                    <title>{title}</title>
                </Head>
                <Header/>
                {children}
            </StyledLayout>
        </ThemeProvider>
    );
};

export default MainLayout;