import React from 'react';
import styles from '../../styles/Title.module.scss';
import styled from "styled-components";

interface TitleProps {
    title: string;
    sub?: boolean;
    type?: 'small' | 'medium' | 'big';
    position?: 'left' | 'center' | 'right';
    className?: string;
}

interface StyledTitleProps {
    position?: 'left' | 'center' | 'right';
    sub?: boolean;
}

const StyledTitle = styled.div<StyledTitleProps>`
  margin-right: ${props => (props.position === 'center' || props.position === 'left') && 'auto'};
  margin-left: ${props => (props.position === 'center' || props.position === 'right') && 'auto'};
`

interface StyledTextProps {
    sub?: boolean;
}

const StyledText = styled.div<StyledTextProps>`
  background: ${props => !props.sub ? props.theme.mainGradient.gradient : props.theme.text};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledShadow = styled.div`
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7), 0 0 50px ${props => props.theme.text};
`

const Title: React.FC<TitleProps> = ({title, sub, position = 'center', type = 'small', className}) => {
    return (
        <StyledTitle sub={sub} className={styles[type] + ' ' + className} position={position}>
            {!sub ? <div className={styles.text}>
                <StyledText className={styles.visible}>{title}</StyledText>
                <StyledShadow className={styles.hidden}>{title}</StyledShadow>
                <div className={styles.height}>{title}</div>
            </div> : <StyledText sub>{title}</StyledText>}
        </StyledTitle>
    );
};

export default Title;