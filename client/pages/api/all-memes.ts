import {supabase} from "@/modules/chatGPT/page/supabaseClient";
import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const fetchMemes = async () => {
        try {
            const { data, error } = await supabase
                .from("meme")
                .select("*")
                .order("created_at", { ascending: false });
            res.status(200).json({ data });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };
    fetchMemes();
}