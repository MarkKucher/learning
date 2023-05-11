import React, {ComponentPropsWithoutRef} from 'react';
import styled from "styled-components";
import styles from "../../styles/Button.module.scss";

interface RoundButtonProps extends ComponentPropsWithoutRef<"div"> {
    position?: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

interface StyledRoundButtonProps {
    children?: React.ReactNode;
    position?: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

const StyledRoundButton = styled.div<StyledRoundButtonProps>`
  background: ${props => props.theme.description};
  position: ${props => props.position};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
`

const RoundButton: React.FC<RoundButtonProps> = ({children, position = 'static', top, bottom, left, right}) => {
    return (
        <StyledRoundButton position={position} top={top} bottom={bottom} left={left} right={right} className={styles.roundButton}>
            {children}
        </StyledRoundButton>
    );
};

export default RoundButton;