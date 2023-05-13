import React from 'react';
import styles from '../../../../styles/Menu.module.scss';
import Link from "@/components/styled/Link";

interface MenuLinkProps {
    title: string;
    link: string;
    shouldOpenInNewTab?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({title, link, shouldOpenInNewTab = false}) => {

    return (
        <Link title={title} link={link} shouldOpenInNewTab={shouldOpenInNewTab} className={styles.link}/>
    );
};

export default MenuLink;