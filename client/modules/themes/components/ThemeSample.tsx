import React, {useEffect, useState} from 'react';
import styles from "../../../styles/Themes.module.scss";
import styled, {DefaultTheme} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme, setTheme} from "@/modules/themes/redux/themeSlice";

interface ThemeSampleProps {
    theme: DefaultTheme;
}

const StyledDescription = styled.div`
  border-bottom-color: ${props => props.theme.description};
`

interface StyledSampleProps {
    isActive: boolean;
}

const StyledSample = styled.div<StyledSampleProps>`
  outline: ${props => props.isActive ? `4px solid ${props.theme.mainGradient.secondColor}` : 'none'};
  &:hover {
    outline: ${props => props.isActive ? `4px solid ${props.theme.mainGradient.secondColor}` : `3px solid ${props.theme.text}`}
  }
`

const ThemeSample: React.FC<ThemeSampleProps> = ({theme}) => {
    const {active} = useSelector(selectTheme);
    const dispatch = useDispatch();

    const isActive = active.name === theme.name;

    const clickHandler = () => {
        dispatch(setTheme(theme.name))
    }

    return (
        <StyledSample isActive={isActive} onClick={clickHandler} className={styles.sample} style={{background: theme.bodyBackground, outlineColor: theme.text}}>
            <div className={styles.sample__container} style={{background: theme.subGradient.gradient}}>
                <div className={styles.sample__description} style={{color: theme.description}}>
                    <StyledDescription/><StyledDescription/><StyledDescription/>
                </div>
                <div className={styles.sample__container_smaller} style={{background: theme.mainGradient.gradient}}>
                    <FontAwesomeIcon icon={faPlay} className={styles.sample__container_smaller__content} style={{color: theme.text}}/>
                </div>
            </div>
        </StyledSample>
    );
};

export default ThemeSample;