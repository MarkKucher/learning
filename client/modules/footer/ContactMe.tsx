import React from 'react';
import styles from "../../styles/ContactMe.module.scss";
import Title from "@/components/text/Title";
import MainGradientText from "@/components/text/MainGradientText";

const ContactMe = () => {
    return (
        <div className={styles.footer} id={'ContactMe'}>
            <Title title={'Contact me'} type={"medium"}/>
            <div className={styles.contacts}>
                <MainGradientText className={styles.contact}>Phone: 0984266311</MainGradientText>
                <MainGradientText className={styles.contact}>Email: markkucher100@gmail.com</MainGradientText>
            </div>
        </div>
    );
};

export default ContactMe;