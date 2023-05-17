import React, {ComponentPropsWithoutRef, MouseEventHandler} from 'react';
import styles from '../../styles/Button.module.scss';
import styled from "styled-components";

const SB = styled.button`
  background: ${props => props.theme.description};
  color: ${props => props.theme.text};
  &:hover {
    border: 2px solid ${props => props.theme.text};
  }
`

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({children, ...props}) => {
    return (
        <SB className={styles.button} {...props}>
            {children}
        </SB>
    );
}

export default Button;