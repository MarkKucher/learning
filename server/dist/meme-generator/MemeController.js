"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeController = void 0;
const MemeService_1 = require("./MemeService");
class MemeController {
    static generate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, audience, email } = req.body;
            console.log('generating meme');
            try {
                const meme = yield MemeService_1.MemeService.generate(topic, audience, email);
                res.json(meme);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memes = yield MemeService_1.MemeService.getAll();
                res.json(memes);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meme = yield MemeService_1.MemeService.getOne(req.params.id);
                res.json(meme);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MemeService_1.MemeService.deleteOne(req.params.id);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    static patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { textId, text } = req.body;
            try {
                const meme = yield MemeService_1.MemeService.patch(req.params.id, textId, text);
                console.log(meme);
                res.json(meme);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
}
exports.MemeController = MemeController;
