import {NextApiRequest, NextApiResponse} from "next";
import {ChatCompletionCreateParams, ChatCompletionMessageParam} from "openai/resources/chat";
import {openai} from "@/jobs";
import {extractSentencesInQuotes} from "@/helpers/extractSentencesInQuotes";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {question} = req.body;

    console.log(question)

    const sysPrompt = `You are a helpful assistant.`

    const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: sysPrompt },
        { role: "user", content: question }
    ];
    const functions: ChatCompletionCreateParams.Function[] = [{
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

    const getFact = async () => {
        try {
            const response = await openai.chat.completions.create( {
                model: "gpt-3.5-turbo",
                messages,
                functions,
                function_call: "auto",
            });

            const responseMessage = response.choices[0];
            console.log(response.choices[0].finish_reason)
            const answer = responseMessage.message.content;

            res.status(200).json({answer})
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    getFact()
}