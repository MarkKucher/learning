import React, {useState} from 'react';
import styles from "../../../styles/EmailAutomationSystem.module.scss";
import axios from "axios";
import { useForm } from "react-hook-form";

const Resend = () => {
    const { handleSubmit, register, reset } = useForm();

    const sendEmail = handleSubmit((data) => {
        const {email, subject, text} = data;
        reset()
        axios.post("/api/send", {
            body: JSON.stringify({
                email,
                subject,
                text
            }),
            headers: {
                "Content-Type": "application/json",
                "Allow": "GET, POST, HEAD"
            },
        })
            .then((data) => {
                alert(`Sent to processing`);
            })
            .catch((err) => {
                alert(`Encountered an error ❌`);
                console.error(err);
            });
    });

    return (
        <form onSubmit={sendEmail} className={styles.example}>
            <label htmlFor="email">Email</label>
            <input
                id={'email'}
                type="email"
                required
                {...register("email")}
            />
            <label htmlFor="subject">Subject</label>
            <input
                id={'subject'}
                type="text"
                required
                {...register("subject")}
            />
            <label htmlFor="text">Text</label>
            <input
                id={'text'}
                type="text"
                required
                {...register("text")}
            />
            <button type="submit" className={styles.example__btn}>
                SEND
            </button>
        </form>
    );
};

export default Resend;