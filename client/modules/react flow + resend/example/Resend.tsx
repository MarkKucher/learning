import React, {useState} from 'react';
import styles from "../../../styles/EmailAutomationSystem.module.scss";
import axios from "axios";

const Resend = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const sendEmail = () => {
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
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendEmail()
        setEmail('')
        setSubject('')
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className={styles.example}>
            <label htmlFor="email">Email</label>
            <input
                id={'email'}
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                required
            />
            <label htmlFor="subject">Subject</label>
            <input
                id={'subject'}
                type="text"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                required
            />
            <label htmlFor="text">Text</label>
            <input
                id={'text'}
                type="text"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
                required
            />
            <button className={styles.example__btn}>
                SEND
            </button>
        </form>
    );
};

export default Resend;