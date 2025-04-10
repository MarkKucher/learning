import React, {useState} from 'react';
import styles from "@/styles/ChatGPT.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import axios from "axios";
import {serverUrl} from "@/utils/const";

interface EditTextProps {
    initialText: string;
    memeId: string;
    textId: number;
    setMeme: any;
    setIsLoading: any;
}

const EditText: React.FC<EditTextProps> = ({initialText, memeId, textId, setMeme, setIsLoading}) => {
    const [initialTextState, setInitialTextState] = useState(initialText);
    const [text, setText] = useState(initialTextState);
    const [isDisabled, setIsDisabled] = useState(true);

    const cancel = () => {
        setIsDisabled(true)
        setText(initialText)
    }

    const change = async () => {
        try {
            setInitialTextState(text);
            setIsDisabled(true);
            setIsLoading(true);
            const response = await axios.patch(`${serverUrl}/memes/${memeId}`, {textId, text})
            setMeme(response.data)
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.edit__area__text}>
            <input
                type={'text'}
                className={styles.edit__area__text__input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isDisabled}
            />
            <div className={styles.edit__area__text__buttons}>
                <button
                    className={styles.edit__area__text__button}
                    onClick={isDisabled ? () => setIsDisabled(prev => !prev) : cancel}
                >
                    {isDisabled ? 'edit' : 'cancel'}
                </button>
                <AnimatePresence>
                    {!isDisabled && initialTextState !== text &&
                        <motion.button
                            className={styles.edit__area__text__change_button}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{stiffness: 1000}}
                            onClick={change}
                        >
                            change
                        </motion.button>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EditText;