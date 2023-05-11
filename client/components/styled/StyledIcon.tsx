import React from 'react';
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import styles from "../../styles/Icon.module.scss";

const Icon = styled.div`
    color: ${props => props.theme.text}
`

interface StyledIconProps extends ComponentPropsWithoutRef<'div'>{
    children: React.ReactNode;
    CN?: string;
}

const StyledIcon: React.FC<StyledIconProps> = ({children, CN= "", ...props}) => {

    return (
        <Icon className={styles[CN]} {...props}>
            {children}
        </Icon>
    );
};

export default StyledIcon;