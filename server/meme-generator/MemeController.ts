import {MemeService} from "./MemeService";
import {Request, Response} from "express";

export class MemeController {

    static async generate(req: Request, res: Response) {
        const {topic, audience, email} = req.body;
        console.log('generating meme')
        try {
            const meme = await MemeService.generate(topic, audience, email)
            res.json(meme)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const memes = await MemeService.getAll()
            res.json(memes)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const meme = await MemeService.getOne(req.params.id);
            res.json(meme)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async deleteOne(req: Request, res: Response) {
        try {
            await MemeService.deleteOne(req.params.id)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async patch(req: Request, res: Response) {
        const {textId, text} = req.body;
        try {
            const meme = await MemeService.patch(req.params.id, textId, text)
            console.log(meme)
            res.json(meme)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}