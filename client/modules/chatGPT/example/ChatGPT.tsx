import React, {useRef, useState} from 'react';
import styles from "@/styles/ChatGPT.module.scss";
import axios from "axios";
import Loader from "@/components/Loader";

const ChatGPT = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const sendRequest = async () => {
        inputRef.current && inputRef.current.blur();
        setQuestion('')
        try {
            setLoading(true)
            const response = await axios.post('/api/chatGPT', {question})
            setAnswer(response.data.answer || 'ChatGPT is not answering')
        } catch (e) {
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
                {answer && <h3 className={styles.h3}>ChatGPT answer</h3>}
                <div className={styles.example__answer}>{answer}</div>
            </div> : <Loader/>}
        </div>
    );
};

export default ChatGPT;