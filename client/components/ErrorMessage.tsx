import React from 'react';
import styles from "../styles/ErrorMessage.module.scss";
import {motion} from "framer-motion";

interface ErrorMessageProps {
    message: string;
}

const variants = {
    open: {
        scale: 1,
        opacity: 1
    },
    closed: {
        scale: 0.8,
        opacity: 0.8
    }
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <motion.div
            transition={{stiffness: 200}}
            initial={variants.closed}
            animate={variants.open}
            exit={variants.closed}
            className={styles.message}
        >
            {message}
        </motion.div>
    );
};

export default ErrorMessage;