import React from 'react';
import styles from '../../styles/Icon.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/icons/Icon";
import {useRouter} from "next/router";

interface OpenPageProps {
    link: string;
}

const OpenPage: React.FC<OpenPageProps> = ({link}) => {
    const router = useRouter()

    return (
        <Icon CN={"icon"} onClick={async () => {await router.push(link)}}>
            <FontAwesomeIcon icon={faLink}/>
        </Icon>
    );
};

export default OpenPage;