import React from 'react';
import styles from '../../styles/Footer.module.scss';
import ListOfTechnologiesUsed from "@/modules/footer/ListOfTechnologiesUsed";
import Header from "@/modules/footer/Header";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background: ${props => props.theme.subGradient.gradient};
`

const Footer = () => {

    return (
        <StyledFooter className={styles.footer} id={'footer'}>
            <Header/>
            <ListOfTechnologiesUsed/>
        </StyledFooter>
    );
};

export default Footer;