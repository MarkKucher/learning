import * as React from "react";
import {motion} from "framer-motion";
import styles from "../../../styles/Menu.module.scss";
import Directory from "@/modules/navigation/menu/items/Directory";
import MenuLink from "@/modules/navigation/menu/items/MenuLink";
import {defaultStructure, navigationElement, pageNavigationElements} from "@/modules/navigation/utils/structure";

const variants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.2
        }
    },
    closed: {
        x: -30,
        opacity: 0
    }
};

const Navigation = () => {

    const returnTree = (children: navigationElement[]) => children.map(entity => entity.isLink
        ? <MenuLink shouldOpenInNewTab={entity.shouldOpenInNewTab} title={entity.title} link={entity.link}/>
        : <Directory title={entity.title}>
            {returnTree(entity.children)}
        </Directory>
    )

    return (
        <motion.div
            initial={variants.closed}
            exit={variants.closed}
            animate={variants.open}
            transition={{stiffness: 1000, damping: 40}}
            className={styles.items}
        >
            {returnTree([...defaultStructure, ...(pageNavigationElements as any)[window.location.pathname]])}
        </motion.div>
    );
};

export default Navigation;
