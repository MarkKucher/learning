import React from "react";
import Image from "next/image";
import styles from "@/styles/ChatGPT.module.scss";
import {Meme} from "@/modules/chatGPT/page/types";
import {useRouter} from "next/router";
import CustomImage from "@/components/CustomImage";

interface ViewMemesProps {
    memes: Meme[]
}

const ViewMemes: React.FC<ViewMemesProps> = ({ memes }) => {
    const router = useRouter()

    return (
        <section className={styles.section}>
            <h2 className={styles.h2}>Recent Memes</h2>
            <div className={styles.memes}>
                {memes.map((meme) => (
                    <div
                        className={styles.meme}
                        key={meme.id}
                    >
                        <CustomImage
                            onClick={() => router.push(`/chatGPT/${meme.id}`)}
                            src={`${meme.url}`}
                            alt={meme.name}
                            className={styles.meme__img}
                            width={400}
                            height={400}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ViewMemes;