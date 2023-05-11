import React from 'react';
import styles from '../../styles/Description.module.scss';

interface DescriptionProps {
    description: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({description}) => {
    return (
        <div className={styles.content}>
            {description}
        </div>
    );
};

export default Description;