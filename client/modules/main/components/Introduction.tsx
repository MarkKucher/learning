import React from 'react';
import styles from '@/styles/Introduction.module.scss';
import MainText from "@/components/text/MainText";

const Introduction = () => {

    return (
        <div className={styles.container}>
            <MainText className={styles.title}>
                Hi!
            </MainText>
            <MainText className={styles.title}>
                I am practicing something I learn about web dev here. You can follow my journey :)
            </MainText>
        </div>
    );
};

export default Introduction;