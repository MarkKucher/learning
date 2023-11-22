import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/icons/Icon";

interface PlayAndPause {
    shouldPlay: boolean;
    changeState: Dispatch<SetStateAction<boolean>>;
}

const PlayAndPause: React.FC<PlayAndPause> = ({shouldPlay, changeState}) => {

    return (
        <Icon CN={"corner"} onClick={() => {changeState(prev => !prev)}}>
            <FontAwesomeIcon icon={shouldPlay ? faPause : faPlay}/>
        </Icon>
    );
};

export default PlayAndPause;