import React from 'react';
import styles from '../../styles/OpenPage.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import StyledIcon from "@/components/styled/StyledIcon";

interface OpenPageProps {
    link: string;
}

const OpenPage: React.FC<OpenPageProps> = ({link}) => {

    return (
        <StyledIcon CN={"icon"} onClick={() => {window.open(link)}}>
            <FontAwesomeIcon icon={faLink}/>
        </StyledIcon>
    );
};

export default OpenPage;