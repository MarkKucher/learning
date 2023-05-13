import React, {useRef, useState} from 'react';
import styles from '../../styles/ExampleBlock.module.scss';
import DetailInfo from "@/components/icons/DetailInfo";
import {motion} from "framer-motion";
import Description from "@/modules/example/Description";
import DescriptionExtended from "@/modules/example/DescriptionExtended";
import CodeExample from "@/modules/example/CodeExample";
import {codeExamples} from "@/modules/example/utils/code";
import styled from "styled-components";
import Color from "@/components/styled/Color";
import Title from "@/components/Title";

interface ExampleBlockProps {
    title: string;
    children: React.ReactNode;
    descriptionContent?: React.ReactNode[];
}

interface StyledBlockProps {
    isDescription: boolean;
}

const StyledBlock = styled.div<StyledBlockProps>`
  background: ${props => props.theme.mainGradient.gradient};
  transition: 300ms linear;
  box-shadow: ${props => props.isDescription && `inset -1000px 0 0 0 ${props.theme.description}`};
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.subScrollbarBackground};
  }
`

const StyledContent = styled.div`
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.subScrollbarBackground};
  }
`

const ExampleBlock: React.FC<ExampleBlockProps> = ({title, children, descriptionContent}) => {
    const [shouldShowDescription, setShouldShowDescription] = useState<boolean>(false)

    const description = descriptionContent ? descriptionContent.length > 1 ? <DescriptionExtended content={descriptionContent}/> : <Description description={descriptionContent[0]}/> : undefined;

    const content = {
        description: {
            x: [30, 0],
            transition: {
                duration: 0.5
            }
        },
        content: {
            x: [-100, 0],
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <StyledBlock id={title} isDescription={shouldShowDescription} className={shouldShowDescription ? styles.description : styles.block}>
                <div className={styles.header}>
                    <Title type={'medium'} position={'left'} title={title} sub/>
                    {descriptionContent && <DetailInfo state={shouldShowDescription} toggleState={setShouldShowDescription}/>}
                </div>
                <motion.div
                    animate={shouldShowDescription ? 'description' : 'content'}
                    variants={content}
                    className={styles.contentContainer}
                    initial={false}
                >
                    <StyledContent
                        className={styles.content}
                    >
                        {shouldShowDescription && descriptionContent ? description : children}
                    </StyledContent>
                </motion.div>
        </StyledBlock>
    );
};

export default ExampleBlock;