import React from 'react';
import styles from "@/styles/Header.module.scss";
import ScrollTo from "@/components/icons/ScrollTo";
import styled from "styled-components";

const StyledTitle = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
  -webkit-background-clip: text;
`

const Header = () => {

    return (
        <div className={styles.subHeader}>
            <StyledTitle className={styles.title}>Technologies used</StyledTitle>
        </div>
    );
};

export default Header;