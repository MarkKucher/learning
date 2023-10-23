import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "@/modules/chatGPT/page/supabaseClient";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const getMeme = async () => {
        const { id } = req.query;

        if(typeof id !== 'string') {
            res.status(400)
            return;
        }

        try {
            const { data, error } = await supabase
                .from("meme")
                .select("*")
                .eq("id", parseInt(id));
            res.status(200).json({ data });
        } catch (error) {
            res.status(400).json({ error });
        }
    };
    getMeme();
}