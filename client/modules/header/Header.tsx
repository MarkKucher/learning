import React from 'react';
import styles from '../../styles/Header.module.scss'
import Title from "@/components/Title";
import styled from "styled-components";
import {Menu} from "@/modules/navigation/menu/Menu";
import ScrollTo from "@/components/icons/ScrollTo";
import Tools from "@/modules/header/Tools";
import ChangeTheme from "@/modules/themes/components/ChangeTheme";

const StyledHeader = styled.header`
  background: ${props => props.theme.subGradient.gradient};
`

interface HeaderProps {
    shouldHaveArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({shouldHaveArrow}) => {
    return (
        <StyledHeader className={styles.header}>
            <Menu/>
            <Title position={'left'} title={'Learning'} type={"big"}/>
            <Tools>
                <ChangeTheme/>
                {shouldHaveArrow && <ScrollTo isArrowUp={false} id={'#footer'} withoutSelfAlignment/>}
            </Tools>
        </StyledHeader>
    );
};

export default Header;