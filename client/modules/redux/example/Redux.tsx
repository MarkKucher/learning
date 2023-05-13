import React from 'react';
import styles from '../../../styles/ReduxExample.module.scss';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {selectExample, setIsBold, setIsCursive, setIsUnderlined} from "@/modules/redux/store/slices/exampleSlice";

interface StyledOptionProps {
    isChosen: boolean
}

const StyledOption = styled.div<StyledOptionProps>`
  background: ${props => props.isChosen ? props.theme.description : 'none'};
  color: ${props => props.theme.text};
  outline: ${props => props.isChosen ? `2px solid ${props.theme.text}` : 'none'};
  &:hover {
    outline-color: ${props => props.theme.text};
  }
  cursor: pointer;
  transition: background-color 300ms;
`

const Redux = () => {
    const {isBold, isCursive, isUnderlined} = useSelector(selectExample);
    const dispatch = useDispatch();

    return (
        <div className={styles.main}>
            <div className={styles.options}>
                <StyledOption
                    isChosen={isBold}
                    onClick={() => {dispatch(setIsBold(!isBold))}}
                    className={styles.option}
                >
                    Bold
                </StyledOption>
                <StyledOption
                    isChosen={isCursive}
                    onClick={() => {dispatch(setIsCursive(!isCursive))}}
                    className={styles.option}
                >
                    Cursive
                </StyledOption>
                <StyledOption
                    isChosen={isUnderlined}
                    onClick={() => {dispatch(setIsUnderlined(!isUnderlined))}}
                    className={styles.option}
                >
                    Underlined
                </StyledOption>
            </div>
        </div>
    );
};

export default Redux;