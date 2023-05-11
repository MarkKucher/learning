import React from 'react';
import styled from "styled-components";

interface StyledDivProps {
    tagName: 'div' | 'header' | 'footer' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    isMain?: boolean;
};

const StyledComponent: React.FC<StyledDivProps> = ({tagName, isMain}) => {
    return (
        styled[tagName]`
          background: ${props => isMain ? props.theme.mainGradient.gradient : props.theme.subGradient.gradient};
          color: ${props => props.theme.text};
        `
    );
};

export default StyledComponent;