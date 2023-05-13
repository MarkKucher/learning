import React from 'react';
import styles from '../styles/Title.module.scss';
import styled from "styled-components";

interface TitleProps {
    title: string;
    sub?: boolean;
    type?: 'small' | 'medium' | 'big';
    position?: 'left' | 'center' | 'right';
}

interface StyledTitleProps {
    position: 'left' | 'center' | 'right';
    sub?: boolean;
}

const StyledTitle = styled.div<StyledTitleProps>`
  background: ${props => !props.sub ? props.theme.mainGradient.gradient : props.theme.text};
  -webkit-background-clip: text;
  margin-right: ${props => (props.position === 'center' || props.position === 'left') && 'auto'};
  margin-left: ${props => (props.position === 'center' || props.position === 'right') && 'auto'};
`

const Title: React.FC<TitleProps> = ({title, sub, position = 'center', type = 'small'}) => {
    return (
        <StyledTitle sub={sub} className={styles[type]} position={position}>
            {title}
        </StyledTitle>
    );
};

export default Title;