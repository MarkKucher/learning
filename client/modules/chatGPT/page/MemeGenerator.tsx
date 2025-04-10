import React from 'react';
import styles from "../../../styles/ChatGPT.module.scss";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { useRouter } from "next/navigation";
import ViewMemes from "./components/ViewMemes";
import {Topic} from "@/modules/chatGPT/page/types";
import axios from "axios";
import { serverUrl } from '@/utils/const';
import TopicBlock from "@/modules/example/TopicBlock";

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const inter = Space_Grotesk({ subsets: ["latin"] });
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MemeGenerator = () => {
    const [audience, setAudience] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [topics, setTopics] = useState<Topic[]>([
        { id: "Developers", text: "Developers" },
    ]);

    const handleDelete = (i: number) =>
        setTopics(topics.filter((topic, index) => index !== i));

    const handleAddition = (topic: Topic) => setTopics([...topics, topic]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (topics.length > 0) {
            let topic = "";
            topics.forEach((tag, index) => {
                topic += tag.text;
                if(index !== topics.length - 1) topic += ", ";
            });

            postData(topic);
            router.push("/chatGPT/submit");
        }
    };

    const postData = async (topic: string) => {
        try {
            const response = await axios.post(`${serverUrl}/memes`, {
                audience,
                topic,
                email,
            });

            const dataFromStorage = localStorage.getItem("created memes")
            const createdMemes = dataFromStorage ? JSON.parse(dataFromStorage) : [];

            localStorage.setItem("created memes", JSON.stringify([...createdMemes, response.data]))
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <TopicBlock title={"ChatGPT"} id={"ChatGPT"}>
            <main className={`${styles.main} ${inter.className}`}>
                <header className={styles.header}>
                    <h2 className={styles.h2}>Meme Magic</h2>
                    <h3 className={styles.h3}>
                        Creating memes with a touch of magic
                    </h3>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="audience">Audience</label>
                        <input
                            type="text"
                            name="audience"
                            id="audience"
                            value={audience}
                            required
                            className={styles.input}
                            onChange={(e) => setAudience(e.target.value)}
                        />
                        <label htmlFor="email">Your email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            required
                            className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="topics">Topics</label>
                        <ReactTags
                            id='topics'
                            tags={topics}
                            delimiters={delimiters}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            inputFieldPosition="top"
                            autocomplete
                            placeholder="Enter a topic for the meme and press enter"
                            classNames={{tagInputField: styles.input, tag: styles.tag, remove: styles.remove, tags: styles.tags}}
                        />
                        <button
                            type="submit"
                            className={styles.button}
                        >
                            GENERATE MEME
                        </button>
                    </form>
                </header>
                <ViewMemes/>
            </main>
        </TopicBlock>
    );
};

export default MemeGenerator;