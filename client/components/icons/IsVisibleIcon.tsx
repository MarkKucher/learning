import React, {Dispatch, SetStateAction} from 'react';
import Icon from "@/components/icons/Icon";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface isVisibleProps {
    isHidden: boolean;
    setIsHidden: Dispatch<SetStateAction<boolean>>;
}

const IsVisibleIcon: React.FC<isVisibleProps> = ({isHidden, setIsHidden}) => {
    return (
        <Icon CN={'corner'} onClick={() => {setIsHidden(prev => !prev)}}>
            <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash}/>
        </Icon>
    );
};

export default IsVisibleIcon;