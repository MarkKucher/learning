import React, {useEffect, useState} from "react";
import styles from "@/../../../../../server/styles/ChatGPT.module.scss";
import {MemeType} from "@/modules/chatGPT/page/types";
import {AnimatePresence} from "framer-motion";
import Meme from "./Meme";
import {motion} from "framer-motion";
import Skeleton from "@/modules/chatGPT/page/components/Skeleton";
import axios from "axios";
import {serverUrl} from "@/utils/const";

const ViewMemes = () => {
    const dataFromStorage = localStorage.getItem('created memes')
    const ids = dataFromStorage ? JSON.parse(dataFromStorage) : [];
    const [memes, setMemes] = useState<MemeType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMemes = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${serverUrl}/memes`)
            setMemes(response.data);
            setIsLoading(false)
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMemes();
    }, []);

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
                {!isLoading ? <AnimatePresence>
                    {memes.map((meme) => (
                        <Meme key={meme.id} ids={ids} initialMeme={meme} setMemes={setMemes}/>
                    ))}
                </AnimatePresence> : <Skeleton width={700} height={700}/>}
            </motion.div>
        </motion.section>
    );
};

export default ViewMemes;