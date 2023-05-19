import React from 'react';
import styles from '../../styles/Footer.module.scss';
import ListOfTechnologiesUsed from "@/modules/footer/ListOfTechnologiesUsed";
import Header from "@/modules/footer/Header";
import styled from "styled-components";
import ContactMe from "@/modules/footer/ContactMe";

const StyledFooter = styled.footer`
  background: ${props => props.theme.subGradient.gradient};
`

const Footer = () => {

    return (
        <StyledFooter className={styles.footer} id={'footer'}>
            <Header/>
            <ListOfTechnologiesUsed/>
            <ContactMe/>
        </StyledFooter>
    );
};

export default Footer;