import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Icon.module.scss";
import styled from "styled-components";

interface DetailInfoProps {
    state: boolean;
    toggleState: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

interface StyledIconProps {
    isInfoOpened: boolean;
}

const StyledIcon = styled.div<StyledIconProps>`
  color: ${props => props.theme.text};
  &:hover {
    border: 3px solid ${props => props.theme.text}
  };
  &:active {
    border: 3px solid ${props => props.isInfoOpened ? props.theme.mainGradient.secondColor : props.theme.description};
    color: ${props => props.isInfoOpened ? props.theme.mainGradient.secondColor : props.theme.description}
  };
`


const DetailInfo: React.FC<DetailInfoProps> = ({state, toggleState, className}) => {

    return (
        <StyledIcon isInfoOpened={state} className={styles.detailInfo + ' ' + className} onClick={() => {toggleState((prev: boolean) => !prev)}}>
            <FontAwesomeIcon icon={faInfo}/>
        </StyledIcon>
    );
};

export default DetailInfo;