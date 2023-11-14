import {openai} from "../entities/openai";
import {ChatCompletionMessageParam} from "openai/resources/chat";


export class ChatGPTService {
    static async answer(question: string) {
        const sysPrompt = `You are a helpful assistant.`

        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: sysPrompt },
            { role: "user", content: question }
        ];

        const functions = [{
            name: 'answerAQuestion',
            description: 'Answer a question',
            parameters: {
                type: 'object',
                properties: {
                    answer: {
                        type: 'string',
                        description: 'Answer'
                    }
                },
                required: ['answer']
            }
        }]

        const response = await openai.chat.completions.create( {
            model: "gpt-3.5-turbo",
            messages,
            functions,
            function_call: "auto",
        });

        const responseMessage = response.choices[0];
        const answer = responseMessage.message.content;

        return answer;
    }
}