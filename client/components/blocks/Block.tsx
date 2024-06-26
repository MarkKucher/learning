import React from 'react';
import styles from '../../styles/Block.module.scss';
import Title from "@/components/text/Title";
import OpenPage from "@/components/icons/OpenPage";
import styled from "styled-components";
import {articleDescriptions} from "@/utils/articleDescriptions";
import Description from "@/components/Description";

interface BlockProps {
    title: string;
    children: React.ReactNode
    hasDescription?: boolean;
    hasLink?: boolean;
    customDescription?: React.ReactNode;
    customLink?: string;
}

const StyledBlock = styled.div`
  background: ${props => props.theme.subGradient.gradient};
`;

const StyledContent = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
`;

const Block: React.FC<BlockProps> = ({children, title, hasDescription, hasLink, customDescription, customLink}) => {
    let description = undefined;
    let link = undefined;

    if(customDescription) {
        description = customDescription;
    } else if(hasDescription) {
        description = (articleDescriptions as any)[title[0].toLowerCase() + title.slice(1)]
    }

    if(customLink) {
        link = customLink;
    } else if(hasLink) {
        link = `/${title[0].toLowerCase() + title.slice(1)}`;
    }

    return (
        <StyledBlock className={styles.block} id={title}>
            <div className={styles.header}>
                <Title title={title} position={'left'}/>
                {link && <OpenPage link={link}/>}
            </div>
            <div className={styles.main}>
                {description && <Description CN={styles.description}>
                    {description}
                </Description>}
                <StyledContent className={styles.content}>
                    {children}
                </StyledContent>
            </div>
        </StyledBlock>
    );
};

export default Block;