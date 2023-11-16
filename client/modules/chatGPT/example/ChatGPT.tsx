import React, {useRef, useState} from 'react';
import styles from "@/styles/ChatGPT.module.scss";
import axios from "axios";
import Loader from "@/components/Loader";
import {serverUrl} from "@/utils/const";

const ChatGPT = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const sendRequest = async () => {
        if(!question) return;
        inputRef.current && inputRef.current.blur();
        setQuestion('')
        try {
            setLoading(true)
            const {data} = await axios.post(`${process.env.SERVER_URL}/chatGPT`, {question})
            console.log(data)
            data ? setAnswer(data) : setError('ChatGPT is not available')
        } catch (e) {
            setError('ChatGPT is not available')
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.example}>
            <div className={styles.example__question}>
                <input
                    type={'text'}
                    placeholder={'Your question'}
                    className={styles.example__input}
                    ref={inputRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {e.key === 'Enter' && sendRequest()}}
                />
                <button className={styles.example__button} onClick={sendRequest}>
                    Ask
                </button>
            </div>
            {!loading ? <div>
                {answer && <h3 className={styles.h3}>{error ? error : 'ChatGPT answer'}</h3>}
                {!error && <div className={styles.example__answer}>{answer}</div>}
            </div> : <Loader/>}
        </div>
    );
};

export default ChatGPT;