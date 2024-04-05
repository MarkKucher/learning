import {Request, Response} from "express";
import {ChatGPTService} from "./ChatGPTService";

export class ChatGPTController {
    static async answer(req: Request, res: Response) {
        const {question} = req.body;

        try {
            const response = await ChatGPTService.answer(question);
            res.json(response)
        } catch (e) {
            res.status(500).json('openai error: ' + e)
        }
    }
}