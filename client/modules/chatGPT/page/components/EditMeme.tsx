import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from "framer-motion";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "@/styles/ChatGPT.module.scss";
import Modal from "@/components/modals/Modal";
import axios from "axios";
import {serverUrl} from "@/utils/const";
import {MemeType} from "@/modules/chatGPT/page/types";
import EditText from "@/modules/chatGPT/page/components/EditText";


interface EditMemeProps {
    meme: MemeType;
    setMemes: any;
    setMeme: any;
    setIsLoading: any;
}

const EditMeme: React.FC<EditMemeProps> = ({meme, setMemes, setMeme, setIsLoading}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [width, setWidth] = useState(700)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [text, setText] = useState<string[]>(meme.texts)
    const [isEditing, setIsEditing] = useState<boolean[]>(meme.texts.map(() => false))

    const condition = (screenWidth: number) => {
        const compareTo = 700;
        if(screenWidth < compareTo) {
            const newWidth = screenWidth - 10
            setWidth(newWidth)
        }
    }

    let onResize = useCallback(() => {
        condition(window.innerWidth)
    }, [])

    useEffect(() => {
        condition(window.innerWidth)
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const remove = () => {
        axios.delete(`${serverUrl}/memes/${meme.id}`)
        setMemes((prev: MemeType[]) => prev.filter(m => m.id !== meme.id))
        setIsModalOpen(false)
        const dataFromStorage = localStorage.getItem('created memes')
        const createdMemes = dataFromStorage ? JSON.parse(dataFromStorage) : [];
        if(createdMemes.length <= 1) {
            localStorage.removeItem('created memes')
        } else {
            localStorage.setItem('created memes', JSON.stringify(createdMemes.filter((id: string) => id !== meme.id)))
        }
    }

    return (
        <div className={styles.edit} style={{width}}>
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{height: 0}}
                    animate={{height: 'auto'}}
                    exit={{height: 0, transition: {delay: 0.5}}}
                    transition={{stiffness: 1000}}
                    className={styles.edit__background}
                >
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {delay: 0.5}}}
                        exit={{opacity: 0}}
                        className={styles.edit__area}
                    >
                        {meme.texts.map((t, i) =>
                            <EditText initialText={t} memeId={meme.id} textId={i} setMeme={setMeme} setIsLoading={setIsLoading} key={t + i}/>
                        )}
                        <div className={styles.edit__area__text}>
                            <button
                                className={styles.edit__area__text__delete_button}
                                onClick={() => {setIsModalOpen(true)}}
                            >
                                delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
            <footer
                className={styles.edit__footer}
                onClick={() => {setIsOpen(prev => !prev)}}
            >
                <motion.div
                    animate={{rotate: isOpen ? 180 : 0}}
                    className={styles.edit__arrow}
                >
                    <FontAwesomeIcon icon={faChevronDown}/>
                </motion.div>
            </footer>
            {isModalOpen && <Modal>
                <div className={styles.edit__confirmation_window}>
                    <h2>Are you sure you want to delete this meme?</h2>
                    <div className={styles.edit__confirmation_window__choices}>
                        <button
                            className={styles.edit__area__text__button}
                            onClick={() => {setIsModalOpen(false)}}
                        >
                            No
                        </button>
                        <button
                            className={styles.edit__area__text__button}
                            onClick={remove}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>}
        </div>
    );
};

export default EditMeme;