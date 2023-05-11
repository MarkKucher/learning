import React from 'react';
import styles from '../../styles/Block.module.scss';
import Title from "@/components/Title";
import ScrollTo from "@/components/icons/ScrollTo";
import OpenPage from "@/components/icons/OpenPage";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectTheme} from "@/modules/themes/redux/themeSlice";
import {articleDescriptions} from "@/utils/articleDescriptions";
import StyledDescription from "@/components/styled/StyledDescription";

interface BlockProps {
    title: string;
    children: React.ReactNode
    hasDescription?: boolean;
    hasLink?: boolean;
    customDescription?: React.ReactNode;
}

const StyledBlock = styled.div`
  background: ${props => props.theme.subGradient.gradient};
`;

const StyledContent = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
`;

const Block: React.FC<BlockProps> = ({children, title, hasDescription, hasLink, customDescription}) => {
    let description = undefined;

    if(customDescription) {
        description = customDescription;
    } else if(hasDescription) {
        description = (articleDescriptions as any)[title.toLowerCase()]
    }

    return (
        <StyledBlock className={styles.block} id={title}>
            <div className={styles.header}>
                <Title title={title}/>
                <div className={styles.icons}>
                    {hasLink && <OpenPage link={`/${title.toLowerCase()}`}/>}
                </div>
            </div>
            <div className={styles.main}>
                {description && <StyledDescription CN={styles.description}>
                    {description}
                </StyledDescription>}
                <StyledContent className={styles.content}>
                    {children}
                </StyledContent>
            </div>
        </StyledBlock>
    );
};

export default Block;