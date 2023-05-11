import React, {useState} from 'react';
import styles from '../../../styles/AnimationsExample.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PlayAndPause from "@/components/icons/PlayAndPause";
import styled from "styled-components";

const StyledCube = styled.div`
  background: ${props => props.theme.text};
`

const Animations = () => {
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)

    return (
        <div className={styles.block}>
            <StyledCube className={shouldAnimate ? styles.cubeAnimate : styles.cube}/>
            <PlayAndPause shouldPlay={shouldAnimate} changeState={setShouldAnimate}/>
        </div>
    );
};

export default Animations;