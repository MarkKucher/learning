import React, {ComponentPropsWithoutRef} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectExample} from "@/modules/redux/store/slices/exampleSlice";

interface StyledTextProps extends ComponentPropsWithoutRef<"div"> {
    children: React.ReactNode;
}

interface STProps {
    isBold: boolean;
    isCursive: boolean;
    isUnderlined: boolean;
}

const ST = styled.div<STProps>`
  font-weight: ${props => props.isBold ? 'bold' : 'normal'};
  font-style: ${props => props.isCursive ? 'oblique' : 'normal'};
  text-decoration: ${props => props.isUnderlined ? `2px solid ${props.theme.mainGradient.secondColor} underline` : 'none'};
  color: ${props => props.theme.description};
`

const StyledText: React.FC<StyledTextProps> = ({children, ...props}) => {
    const {isBold, isCursive, isUnderlined} = useSelector(selectExample);

    return (
        <ST isBold={isBold} isCursive={isCursive} isUnderlined={isUnderlined} {...props}>
            {children}
        </ST>
    );
};

export default StyledText;