import React, {ComponentPropsWithoutRef} from 'react';
import styles from "@/styles/Block.module.scss";
import MainText from "@/components/text/MainText";

interface TopicBlockProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    children: React.ReactNode;
}

const TopicBlock: React.FC<TopicBlockProps> = ({children, title, ...props}) => {
    return (
        <div className={styles.topicBlock} {...props}>
            <div className={styles.mainHeader}>
                <MainText>{title}</MainText>
            </div>
            {children}
        </div>
    );
};

export default TopicBlock;