import React from 'react';
import Link from "next/link";
import styles from '@/styles/ChatGPT.module.scss';

const Submit = () => {
    return (
        <div className={styles.submit}>
            <h2 className={styles.thanks}>
                Thank You!
            </h2>
            <p style={{marginBottom: '1.5rem'}}>
                Your newly generated meme has been sent to your email.
            </p>
            <Link href="/chatGPT">
                <p style={{color: '#662549'}}>Go Home</p>
            </Link>
        </div>
    );
};

export default Submit;