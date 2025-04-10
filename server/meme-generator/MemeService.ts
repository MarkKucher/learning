import axios from "axios";
import {ChatCompletionMessageParam} from "openai/resources/chat";
import {openai} from "../entities/openai";
import {resend} from "../entities/resend";
import {collections} from "../database/services/database.service";
import {ObjectId} from "mongodb";
import {DBError} from "../database/exceptions/error";
import Meme from "../database/models/meme";

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

        const sysPrompt = `You are a meme idea generator. You will use the imgflip api to generate a meme based on an idea you suggest.
         Given a random template name and topics, generate a meme idea for the intended audience.
          Only use the template provided. Write in quotes only the content that will be displayed on meme.`;

        const messages: ChatCompletionMessageParam[] = [
            {role: "system", content: sysPrompt},
            {role: "user", content: userPrompt},
        ];

        const functions = [
            {
                name: "generateMemeImage",
                description: "Generate meme via the imgflip API based on the given idea",
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
                    required: ["text0", "text1"],
                },
            }
        ]

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            functions,
            function_call: 'auto'
        });

        const responseMessage = response.choices[0]

        const answer = responseMessage.message.function_call?.arguments

        if (!answer) {
            throw new Error('No answer from chatGPT')
        }

        const {text0, text1} = JSON.parse(answer)

        console.log(`Response from openai:`, responseMessage)

        const texts = [text0, text1]

        console.log("✨ Yay! You've gotten a text for your meme ✨", {
            texts,
        });

        console.log("Received meme template and texts 🎉");

        const captionedMeme = await MemeService.createMemeImage(selectedTemplate.id, texts)

        console.log("✨ Yay! Your meme has been captioned! ✨", {
            captionedMeme,
        });

        const result = await collections.memes?.insertOne({
            name: selectedTemplate.name,
            url: captionedMeme?.data?.url,
            texts,
            templateId: selectedTemplate.id,
            createdAt: new Date()
        });

        if(!result) throw new DBError(500, 'Failed to create meme');

        console.log("Row from a mongodb", result)

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

        console.log(
            "✨ Yay! Your meme has been saved to the database! ✨"
        );

        console.log("Sending meme to the user 🎉");

        const url = `${clientUrl}/chatGPT/${selectedTemplate.id}`

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: "Your meme is ready!",
            text: `Hey there, Your meme is ready.\n Access it here: ${url}`,
        })

        console.log("✨ Yay! Your meme has been emailed to the user! ✨");

        return result.insertedId;
    }

    static async getAll() {
        const memes = (await collections.memes?.find({}).sort({createdAt: -1}).toArray()) as unknown as Meme[];

        return memes;
    }

    static async getOne(id: string): Promise<Meme> {
        const query = { _id: new ObjectId(id) };

        const meme = (await collections.memes?.findOne(query)) as unknown as Meme;

        if(!meme) throw new DBError(404, `Unable to find matching document with id: ${id}`);

        return meme;
    }

    static async deleteOne(id: string) {
        const query = { _id: new ObjectId(id) };
        const result = await collections.memes?.deleteOne(query);

        if (!result) {
            throw new DBError(400, `Failed to remove meme with id ${id}`);
        }

        if (!result.deletedCount) {
            throw new DBError(404, `Meme with id ${id} does not exist`);
        }
    }

    static async patch(id: string, textId: number, text: string) {
        const meme = await MemeService.getOne(id);

        let newArray = meme ? meme.texts : [];
        newArray[textId] = text;

        const captionedMeme = await MemeService.createMemeImage(meme.templateId, newArray)

        if(!captionedMeme.success) throw new DBError(400, `Can not update meme image with id ${id}`);

        const query = { _id: new ObjectId(id) };

        const result = await collections.memes?.updateOne(query,
            {$set: {url: captionedMeme.data.url, texts: newArray}}
        );

        if(!result) throw new DBError(304, `Failed to update meme with id ${id}`);

        return {
            _id: meme._id,
            name: meme.name,
            url: captionedMeme.data.url,
            texts: newArray,
            templateId: meme.templateId,
        }
    }

    static async createMemeImage(id: string, texts: string[]) {
        let objTexts: any = {}

        texts.forEach((t, i) => {
            objTexts[`text${i}`] = t
        })

        const formatData = new URLSearchParams({
            template_id: id,
            username: process.env.IMGFLIP_USERNAME,
            password: process.env.IMGFLIP_PASSWORD,
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