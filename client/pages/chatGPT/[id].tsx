import React, {useEffect, useState} from "react";
import Link from "next/link";
import {MemeType} from "@/modules/chatGPT/page/types";
import Image from "next/image";
import styles from "@/styles/ChatGPT.module.scss";
import axios from "axios";
import {useRouter} from "next/router";
import CustomImage from "@/components/CustomImage";
import {serverUrl} from "@/utils/const";

const MemePage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [meme, setMeme] = useState<MemeType>({} as MemeType);

    useEffect(() => {
        const fetchMeme = async () => {
            if (id) {
                const response = await axios.get(`${serverUrl}/memes/${id}`);
                setMeme(response.data[0]);
            }
        };

        fetchMeme();
    }, [id]);

    return (
        <div className={styles.full_meme}>
            {meme?.url && (
                <CustomImage
                    src={meme.url}
                    alt={meme.name}
                    width={500}
                    height={500}
                    className={styles.full_meme__img}
                />
            )}

            <Link href="/chatGPT" className={styles.full_meme__link}>
                Go back home
            </Link>
        </div>
    );
}

export default MemePage;

export async function getServerSideProps(context: any) {
    const { params } = context;
    const id = params.id;
    return {
        props: {id}
    }
}