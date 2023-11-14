import React, {useEffect, useState} from 'react';
import styles from "@/styles/ChatGPT.module.scss";
import CustomImage from "@/components/CustomImage";
import EditMeme from "@/modules/chatGPT/page/components/EditMeme";
import {motion} from "framer-motion";
import {MemeType} from "@/modules/chatGPT/page/types";
import {useRouter} from "next/router";
import axios from "axios";
import {serverUrl} from "@/utils/const";

interface MemeProps {
    ids: string[]
    initialMeme: MemeType;
    setMemes: any;
}

const Meme: React.FC<MemeProps> = ({ids, initialMeme, setMemes}) => {
    const [meme, setMeme] = useState(initialMeme)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    return (
        <motion.div
            className={styles.meme}
            initial={{scale: 1, height: 'auto'}}
            exit={{scale: 0, height: 0}}
            transition={{stiffness: 1000}}
        >
            {meme?.url && <CustomImage
                width={700}
                height={700}
                isLoading={isLoading}
                onClick={() => router.push(`/chatGPT/${meme.id}`)}
                src={meme.url}
                alt={meme.name}
                className={styles.meme__img}
            />}
            {ids.includes(meme.id) && <EditMeme meme={meme} setMemes={setMemes} setMeme={setMeme} setIsLoading={setIsLoading}/>}
        </motion.div>
    );
};

export default Meme;