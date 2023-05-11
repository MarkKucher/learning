import React from 'react';
import styles from '../styles/Title.module.scss';
import styled from "styled-components";

interface TitleProps {
    title: string;
    bigger?: boolean;
}

const StyledTitle = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
  -webkit-background-clip: text;
`

const Title: React.FC<TitleProps> = ({title, bigger}) => {
    return (
        <StyledTitle className={bigger ? styles.grandTitle : styles.title}>
            {title}
        </StyledTitle>
    );
};

export default Title;