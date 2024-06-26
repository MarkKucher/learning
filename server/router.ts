import {Application} from "express";
import {MemeController} from "./meme-generator/MemeController";
import {ChatGPTController} from "./chatGPT/ChatGPTController";
import {TestController} from "./test/TestController";

export const router = (app: Application) => {
    app.get('/test', TestController.test)
    app.get('/memes', MemeController.getAll)
    app.get('/memes/:id', MemeController.getOne)
    app.post('/memes', MemeController.generate)
    app.delete('/memes/:id', MemeController.deleteOne)
    app.patch('/memes/:id', MemeController.patch)
    app.post('/chatGPT', ChatGPTController.answer)
}