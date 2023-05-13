import React from 'react';
import styles from '../../styles/Icon.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/styled/Icon";

interface OpenPageProps {
    link: string;
}

const OpenPage: React.FC<OpenPageProps> = ({link}) => {

    return (
        <Icon CN={"icon"} onClick={() => {window.open(link)}}>
            <FontAwesomeIcon icon={faLink}/>
        </Icon>
    );
};

export default OpenPage;