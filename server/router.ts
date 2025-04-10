import {Application} from "express";
import {MemeController} from "./meme-generator/MemeController";
import {ChatGPTController} from "./chatGPT/ChatGPTController";
import {TestController} from "./test/TestController";

export const router = (app: Application) => {
    app.get('/test', TestController.test)
    app.post('/chatGPT', ChatGPTController.answer)
}