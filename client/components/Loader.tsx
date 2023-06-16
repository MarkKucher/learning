import React from 'react';
import styles from "@/styles/Thunk.module.scss";
import {motion} from "framer-motion";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}/>
        </div>
    );
};

export default Loader;