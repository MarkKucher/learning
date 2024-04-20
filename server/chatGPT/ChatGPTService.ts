import {openai} from "../entities/openai";
import {ChatCompletionMessageParam} from "openai/resources/chat";


export class ChatGPTService {
    static async answer(question: string) {
        const sysPrompt = `You are a helpful assistant.`

        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: sysPrompt },
            { role: "user", content: question }
        ];

        try {
            const response = await openai.chat.completions.create({
                messages,
                model: "gpt-3.5-turbo",
            });

            const responseMessage = response.choices[0];
            const answer = responseMessage.message.content;

            return answer;
        } catch (e) {
            console.log(e)
        }
    }
}