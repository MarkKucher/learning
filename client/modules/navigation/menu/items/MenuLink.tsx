import React from 'react';
import styles from '../../../../styles/Menu.module.scss';
import StyledLink from "@/components/styled/StyledLink";

interface MenuLinkProps {
    title: string;
    link: string;
    shouldOpenInNewTab?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({title, link, shouldOpenInNewTab = false}) => {

    return (
        <StyledLink title={title} link={link} shouldOpenInNewTab={shouldOpenInNewTab} className={styles.link}/>
    );
};

export default MenuLink;