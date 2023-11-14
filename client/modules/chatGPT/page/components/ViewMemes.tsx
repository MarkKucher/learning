import React from "react";
import styles from "@/styles/ChatGPT.module.scss";
import {MemeType} from "@/modules/chatGPT/page/types";
import {useRouter} from "next/router";
import CustomImage from "@/components/CustomImage";
import EditMeme from "@/modules/chatGPT/page/components/EditMeme";
import {AnimatePresence, motion} from "framer-motion";
import Meme from "./Meme";

interface ViewMemesProps {
    memes: MemeType[]
    setMemes: any
}

const ViewMemes: React.FC<ViewMemesProps> = ({ memes, setMemes }) => {
    const router = useRouter()
    const dataFromStorage = localStorage.getItem('created memes')
    const ids = dataFromStorage ? JSON.parse(dataFromStorage) : [];

    return (
        <section className={styles.section}>
            <h2 className={styles.h2}>Recent Memes</h2>
            <div className={styles.memes}>
                <AnimatePresence>
                    {memes.map((meme) => (
                        <Meme key={meme.id} ids={ids} initialMeme={meme} setMemes={setMemes}/>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ViewMemes;