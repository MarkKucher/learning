import React from 'react';
import styled from "styled-components";

const StyledText = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface MainTextProps {
    children: React.ReactNode;
    className?: string;
}

const MainText: React.FC<MainTextProps> = ({children, className}) => {
    return (
        <StyledText className={className}>
            {children}
        </StyledText>
    );
};

export default MainText;