import {NextApiRequest, NextApiResponse} from "next";
import {client} from "@/trigger";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { topic, audience, email } = req.body;

    try {
        const fetchMeme = async () => {
            if (topic && audience && email) {
                await client.sendEvent({
                    name: "generate.meme",
                    payload: {
                        audience,
                        topic,
                        email,
                    },
                });
            }
        }
        fetchMeme();
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}