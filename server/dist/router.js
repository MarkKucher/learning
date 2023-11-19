"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const MemeController_1 = require("./meme-generator/MemeController");
const ChatGPTController_1 = require("./chatGPT/ChatGPTController");
const router = (app) => {
    app.get('/memes', MemeController_1.MemeController.getAll);
    app.get('/memes/:id', MemeController_1.MemeController.getOne);
    app.post('/memes', MemeController_1.MemeController.generate);
    app.delete('/memes/:id', MemeController_1.MemeController.deleteOne);
    app.patch('/memes/:id', MemeController_1.MemeController.patch);
    app.post('/chatGPT', ChatGPTController_1.ChatGPTController.answer);
};
exports.router = router;
