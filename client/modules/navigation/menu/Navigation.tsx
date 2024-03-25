import * as React from "react";
import {motion} from "framer-motion";
import styles from "../../../styles/Menu.module.scss";
import Directory from "@/modules/navigation/menu/items/Directory";
import MenuLink from "@/modules/navigation/menu/items/MenuLink";
import {defaultStructure, navigationElement, pageNavigationElements} from "@/modules/navigation/utils/structure";
import styled from "styled-components";

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

const StyledItems = styled(motion.div)`
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.subScrollbarBackground};
  }
`

const Navigation = () => {

    const returnTree = (children: navigationElement[]) => children.map(entity => entity.isLink
        ? <MenuLink key={entity.title} shouldOpenInNewTab={entity.shouldOpenInNewTab} title={entity.title} link={entity.link}/>
        : <Directory key={entity.title} title={entity.title}>
            {returnTree(entity.children)}
        </Directory>
    )

    return (
        <StyledItems
            initial={variants.closed}
            exit={variants.closed}
            animate={variants.open}
            transition={{stiffness: 1000, damping: 40}}
            className={styles.items}
        >
            {returnTree([...defaultStructure, ...(pageNavigationElements as any)['/' + window.location.pathname.split('/')[1]]])}
        </StyledItems>
    );
};

export default Navigation;
