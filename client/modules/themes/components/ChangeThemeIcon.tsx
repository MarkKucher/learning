import React, {useState} from 'react';
import Icon from "@/components/icons/Icon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Themes.module.scss";
import {motion} from "framer-motion";

interface ChangeThemeIconProps {
    shouldOpen: boolean;
    setShouldOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeThemeIcon: React.FC<ChangeThemeIconProps> = ({shouldOpen, setShouldOpen}) => {

    return (
        <Icon CN={"icon"} onClick={() => {setShouldOpen(prev => !prev)}}>
            <FontAwesomeIcon icon={faSun}/>|<FontAwesomeIcon icon={faMoon}/>
        </Icon>
    );
};

export default ChangeThemeIcon;