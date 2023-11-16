import {supabase} from "../entities/supabase";
import axios from "axios";
import {ChatCompletionCreateParams, ChatCompletionMessageParam} from "openai/resources/chat";
import {extractSentencesInQuotes} from "../helpers/extractSentencesInQuotes";
// import {transporter} from "../entities/nodemailer";
import {openai} from "../entities/openai";

interface Meme {
    id: number;
    name: string;
    url: string;
    texts: string[];
}

export class MemeService {

    static async generate(topic: string, audience: string, email: string) {
        if (!topic || !audience || !email) return;

        const getSelectedTemplate = async () => {
            const response = await axios.get("https://api.imgflip.com/get_memes");
            const memesData = response.data;
            const memes = memesData.data.memes;

            const randInt = Math.floor(Math.random() * 101);

            return memes[randInt];
        };

        const selectedTemplate = await getSelectedTemplate()

        console.log('Selected template:', selectedTemplate)

        const userPrompt = `Topics: ${topic} \n Intended Audience: ${audience} \n Template: ${selectedTemplate.name} \n`;

        const sysPrompt = `You are a meme idea generator. You will use the imgflip api to generate a meme based on an idea you suggest. Given a random template name and topics, generate a meme idea for the intended audience. Only use the template provided. Write in quotes only the content that will be displayed on meme.`;

        const messages: ChatCompletionMessageParam[] = [
            {role: "system", content: sysPrompt},
            {role: "user", content: userPrompt},
        ];
        const functions = [
            {
                name: "generateMemeImage",
                description:
                    "Generate meme via the imgflip API based on the given idea",
                parameters: {
                    type: "object",
                    properties: {
                        text0: {
                            type: "string",
                            description: "The text for the top caption of the meme",
                        },
                        text1: {
                            type: "string",
                            description: "The text for the bottom caption of the meme",
                        },
                    },
                    required: ["templateName", "text0", "text1"]
                },
            },
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            functions,
            function_call: "auto",
        });

        console.log(`Response from openai: ${response}`);

        const responseMessage = response.choices[0];
        const inputString = responseMessage.message.content;

        let texts = inputString ? extractSentencesInQuotes(inputString) : [];

        texts = texts.filter(t => t !== selectedTemplate.name)

        console.log("✨ Yay! You've gotten a text for your meme ✨", {
            texts,
        });

        console.log("Received meme template and texts 🎉");

        const captionedMeme = await MemeService.createMemeImage(selectedTemplate.id, texts)

        console.log("✨ Yay! Your meme has been captioned! ✨", {
            captionedMeme,
        });

        const {data, error} = await supabase.from("meme").insert([{
            id: selectedTemplate.id,
            name: selectedTemplate.name,
            url: captionedMeme?.data?.url,
            texts
        }]).select();

        console.log("Row from a supabase", {
            data, error
        })

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

        console.log(
            "✨ Yay! Your meme has been saved to the database! ✨"
        );

        console.log("Sending meme to the user 🎉");

        const url = `${clientUrl}/chatGPT/${selectedTemplate.id}`

        const mailData = {
            from: "markkucher100@gmail.com",
            to: [email],
            subject: "Your meme is ready!",
            text: `Hey there, Your meme is ready.\n Access it here: ${url}`,
        };

        // await transporter.sendMail(mailData, (err: any, info: any) => {
        //     console.log(err ? err : info)
        // });

        console.log("✨ Yay! Your meme has been emailed to the user! ✨");

        return data;
    }

    static async getAll() {
        const { data, error } = await supabase
            .from("meme")
            .select("*")
            .order("created_at", { ascending: false });
        if(error) {
            throw error;
        } else {
            return data;
        }
    }

    static async getOne(id: string) {
        const { data, error } = await supabase
            .from("meme")
            .select("*")
            .eq("id", parseInt(id));
        if(error) {
            throw error;
        } else {
            return data;
        }
    }

    static async deleteOne(id: string) {
        const { error } = await supabase
            .from('meme')
            .delete()
            .eq("id", parseInt(id));
        if(error) {
            throw error;
        }
    }

    static async patch(id: string, textId: number, text: string) {
        const data = await MemeService.getOne(id);

        const meme: Meme = data ? data[0] : {}

        let newArray = meme ? meme.texts : [];
        newArray[textId] = text;

        const captionedMeme = await MemeService.createMemeImage(id, newArray)

        if(!captionedMeme.success) return;

        const { error } = await supabase
            .from('meme')
            .update({ url: captionedMeme.data.url, texts: newArray })
            .eq('id', parseInt(id))
            .select()

        if(error) {
            throw error;
        } else {
            return {
                id: meme.id,
                name: meme.name,
                url: captionedMeme.data.url,
                texts: newArray
            }
        }
    }

    static async createMemeImage(id: string, texts: string[]) {
        let objTexts: any = {}

        texts.forEach((t, i) => {
            objTexts[`text${i}`] = t
        })

        const formatData = new URLSearchParams({
            template_id: id,
            username: 'g_user_108829902778473979498',
            password: 'sfhasiufhse@#34',
            ...objTexts
        });

        const getCaptionedMeme = async () => {
            const response = await axios.post("https://api.imgflip.com/caption_image", formatData.toString());
            return await response.data;
        };

        const captionedMeme = await getCaptionedMeme()

        return captionedMeme;
    }
}