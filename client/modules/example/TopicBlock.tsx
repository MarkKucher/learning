import React, {ComponentPropsWithoutRef} from 'react';
import styles from "@/styles/Block.module.scss";
import Title from "@/components/text/Title";
import styled from "styled-components";

interface TopicBlockProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    children: React.ReactNode;
}

const STB = styled.div`
  background: ${props => props.theme.subGradient.gradient};
`

const TopicBlock: React.FC<TopicBlockProps> = ({children, title, ...props}) => {
    return (
        <STB className={styles.topicBlock} {...props}>
            <div className={styles.mainHeader}>
                <Title title={title} type={"big"}/>
            </div>
            {children}
        </STB>
    );
};

export default TopicBlock;