import React, {useState} from 'react';
import styles from "@/styles/ChatGPT.module.scss";
import axios from "axios";
import Loader from "@/components/Loader";

const TellRandomFact = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/randomFact', {question})

            console.log(response.data)
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
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
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

export default TellRandomFact;