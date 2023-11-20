import React from 'react';
import styles from "../../styles/Header.module.scss";
import styled from "styled-components";

interface ToolsProps {
    children: React.ReactNode;
}

const StyledContainer = styled.div`
  background: ${props => props.theme.description};
  color: ${props => props.theme.text};
  border: 5px solid ${props => props.theme.text};
`

const Tools: React.FC<ToolsProps> = ({children}) => {
    return (
        <StyledContainer className={styles.tools}>
            {children}
        </StyledContainer>
    );
};

export default Tools;