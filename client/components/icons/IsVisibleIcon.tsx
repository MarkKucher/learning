import React, {Dispatch, SetStateAction} from 'react';
import Icon from "@/components/icons/Icon";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface isVisibleProps {
    isHidden: boolean;
    setIsHidden: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

const IsVisibleIcon: React.FC<isVisibleProps> = ({isHidden, setIsHidden, className}) => {
    return (
        <Icon CN={'corner'} onClick={() => {setIsHidden(prev => !prev)}} className={className}>
            <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash}/>
        </Icon>
    );
};

export default IsVisibleIcon;