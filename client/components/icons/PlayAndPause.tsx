import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/PlayAndPause.module.scss';
import StyledIcon from "@/components/styled/StyledIcon";

interface PlayAndPause {
    shouldPlay: boolean;
    changeState: Dispatch<SetStateAction<boolean>>;
}

const PlayAndPause: React.FC<PlayAndPause> = ({shouldPlay, changeState}) => {

    return (
        <StyledIcon className={styles.icon} onClick={() => {changeState(prev => !prev)}}>
            <FontAwesomeIcon icon={shouldPlay ? faPause : faPlay}/>
        </StyledIcon>
    );
};

export default PlayAndPause;