import React from 'react';
import Link from "next/link";
import styles from "@/styles/WrongPath.module.scss";

const WrongPath = () => {

    return (
        <div className={styles.main}>
            <h1 className={styles.message}>404: Wrong path</h1>
            <Link className={styles.link} href={'/'}>Go home</Link>
        </div>
    );
};

export default WrongPath;