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
exports.ChatGPTService = void 0;
const openai_1 = require("../entities/openai");
class ChatGPTService {
    static answer(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const sysPrompt = `You are a helpful assistant.`;
            const messages = [
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
                }];
            const response = yield openai_1.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                functions,
                function_call: "auto",
            });
            const responseMessage = response.choices[0];
            const answer = responseMessage.message.content;
            return answer;
        });
    }
}
exports.ChatGPTService = ChatGPTService;
