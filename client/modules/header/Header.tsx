import React from 'react';
import styles from '../../styles/Header.module.scss'
import Title from "@/components/text/Title";
import styled from "styled-components";
import Menu from "@/modules/navigation/menu/Menu";
import Tools from "@/modules/header/Tools";
import ChangeTheme from "@/modules/themes/components/ChangeTheme";

const StyledHeader = styled.header`
  background: ${props => props.theme.subGradient.gradient};
`

const Border = styled.div`
  width: 100vw;
  height: 5px;
  background: ${props => props.theme.mainGradient.gradient};
`

const Header = () => {
    return (
        <>
            <StyledHeader className={styles.header}>
                <Menu/>
                <Title position={'left'} title={'𝑳𝒆𝒂𝒓𝒏𝒊𝒏𝒈'} type={"big"}/>
                <Tools>
                    <ChangeTheme/>
                </Tools>
            </StyledHeader>
            <Border className={styles.shadow}/>
        </>

    );
};

export default Header;