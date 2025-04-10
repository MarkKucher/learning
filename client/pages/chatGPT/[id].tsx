import React from "react";
import Link from "next/link";
import {MemeType} from "@/modules/chatGPT/page/types";
import styles from "@/styles/ChatGPT.module.scss";
import axios from "axios";
import CustomImage from "@/components/CustomImage";
import {serverUrl} from "@/utils/const";

interface ServerSideProps {
    id: string;
    meme: MemeType;
}

const MemePage: React.FC<ServerSideProps> = ({meme}) => {

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

    const response = await axios.get(`${serverUrl}/memes/${params.id}`);

    const meme = response.data;

    if(!meme) {
        return {
            redirect: {
                permanent: false,
                destination: "/error"
            }
        }
    }

    return {
        props: {meme}
    }
}