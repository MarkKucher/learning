import React from "react";
import styles from "@/styles/ChatGPT.module.scss";
import {MemeType} from "@/modules/chatGPT/page/types";
import {AnimatePresence} from "framer-motion";
import Meme from "./Meme";
import {motion} from "framer-motion";
import Skeleton from "@/modules/chatGPT/page/components/Skeleton";
import Shimmer from "@/modules/chatGPT/page/components/Shimmer";

interface ViewMemesProps {
    memes: MemeType[]
    setMemes: any
}

const ViewMemes: React.FC<ViewMemesProps> = ({ memes, setMemes }) => {
    const dataFromStorage = localStorage.getItem('created memes')
    const ids = dataFromStorage ? JSON.parse(dataFromStorage) : [];

    return (
        <motion.section
            className={styles.section}
        >
            <h2 className={styles.h2}>Recent Memes</h2>
            <motion.div
                className={styles.memes}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {memes ? <AnimatePresence>
                    {memes.map((meme) => (
                        <Meme key={meme.id} ids={ids} initialMeme={meme} setMemes={setMemes}/>
                    ))}
                </AnimatePresence> : <Skeleton width={700} height={700}/>}
            </motion.div>
        </motion.section>
    );
};

export default ViewMemes;