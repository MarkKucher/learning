import React from 'react';
import styles from "@/styles/Header.module.scss";
import Title from "@/components/text/Title";

const Header = () => {

    return (
        <div className={styles.subHeader}>
            <Title type={"big"} title={"Technologies used"}/>
        </div>
    );
};

export default Header;