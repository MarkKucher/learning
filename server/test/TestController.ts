import {Request, Response} from "express";
import {TestService} from "./TestService";

export class TestController {
    static async test(req: Request, res: Response) {
        try {
            const response = await TestService.test();
            res.json(response)
        } catch (e) {
            res.status(500).json('Test failed')
        }
    }
}