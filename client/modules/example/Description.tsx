import React from 'react';
import styles from '../../styles/Description.module.scss';
import Text from "@/components/text/Text";

interface DescriptionProps {
    description: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({description}) => {
    return (
        <div className={styles.block}>
            <div className={styles.singleContent}>
                <Text>
                    {description}
                </Text>
            </div>
        </div>
    );
};

export default Description;