import React from 'react';
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import styles from "../../styles/Icon.module.scss";

const I = styled.div`
  color: ${props => props.theme.text};
`

interface StyledIconProps extends ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    CN?: string;
    className?: string;
}

const Icon: React.FC<StyledIconProps> = ({children, CN= "icon", className, ...props}) => {

    return (
        <I className={styles[CN] + ' ' + className} {...props}>
            {children}
        </I>
    );
};

export default Icon;