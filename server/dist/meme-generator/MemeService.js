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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeService = void 0;
const supabase_1 = require("../entities/supabase");
const axios_1 = __importDefault(require("axios"));
const extractSentencesInQuotes_1 = require("../helpers/extractSentencesInQuotes");
// import {transporter} from "../entities/nodemailer";
const openai_1 = require("../entities/openai");
class MemeService {
    static generate(topic, audience, email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!topic || !audience || !email)
                return;
            const getSelectedTemplate = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.get("https://api.imgflip.com/get_memes");
                const memesData = response.data;
                const memes = memesData.data.memes;
                const randInt = Math.floor(Math.random() * 101);
                return memes[randInt];
            });
            const selectedTemplate = yield getSelectedTemplate();
            console.log('Selected template:', selectedTemplate);
            const userPrompt = `Topics: ${topic} \n Intended Audience: ${audience} \n Template: ${selectedTemplate.name} \n`;
            const sysPrompt = `You are a meme idea generator. You will use the imgflip api to generate a meme based on an idea you suggest. Given a random template name and topics, generate a meme idea for the intended audience. Only use the template provided. Write in quotes only the content that will be displayed on meme.`;
            const messages = [
                { role: "system", content: sysPrompt },
                { role: "user", content: userPrompt },
            ];
            const functions = [
                {
                    name: "generateMemeImage",
                    description: "Generate meme via the imgflip API based on the given idea",
                    parameters: {
                        type: "object",
                        properties: {
                            text0: {
                                type: "string",
                                description: "The text for the top caption of the meme",
                            },
                            text1: {
                                type: "string",
                                description: "The text for the bottom caption of the meme",
                            },
                        },
                        required: ["templateName", "text0", "text1"]
                    },
                },
            ];
            const response = yield openai_1.openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages,
                functions,
                function_call: "auto",
            });
            console.log(`Response from openai: ${response}`);
            const responseMessage = response.choices[0];
            const inputString = responseMessage.message.content;
            let texts = inputString ? (0, extractSentencesInQuotes_1.extractSentencesInQuotes)(inputString) : [];
            texts = texts.filter(t => t !== selectedTemplate.name);
            console.log("✨ Yay! You've gotten a text for your meme ✨", {
                texts,
            });
            console.log("Received meme template and texts 🎉");
            const captionedMeme = yield MemeService.createMemeImage(selectedTemplate.id, texts);
            console.log("✨ Yay! Your meme has been captioned! ✨", {
                captionedMeme,
            });
            const { data, error } = yield supabase_1.supabase.from("meme").insert([{
                    id: selectedTemplate.id,
                    name: selectedTemplate.name,
                    url: (_a = captionedMeme === null || captionedMeme === void 0 ? void 0 : captionedMeme.data) === null || _a === void 0 ? void 0 : _a.url,
                    texts
                }]).select();
            console.log("Row from a supabase", {
                data, error
            });
            const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
            console.log("✨ Yay! Your meme has been saved to the database! ✨");
            console.log("Sending meme to the user 🎉");
            const url = `${clientUrl}/chatGPT/${selectedTemplate.id}`;
            const mailData = {
                from: "markkucher100@gmail.com",
                to: [email],
                subject: "Your meme is ready!",
                text: `Hey there, Your meme is ready.\n Access it here: ${url}`,
            };
            // await transporter.sendMail(mailData, (err: any, info: any) => {
            //     console.log(err ? err : info)
            // });
            console.log("✨ Yay! Your meme has been emailed to the user! ✨");
            return data;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("meme")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            else {
                return data;
            }
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("meme")
                .select("*")
                .eq("id", parseInt(id));
            if (error) {
                throw error;
            }
            else {
                return data;
            }
        });
    }
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase_1.supabase
                .from('meme')
                .delete()
                .eq("id", parseInt(id));
            if (error) {
                throw error;
            }
        });
    }
    static patch(id, textId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield MemeService.getOne(id);
            const meme = data ? data[0] : {};
            let newArray = meme ? meme.texts : [];
            newArray[textId] = text;
            const captionedMeme = yield MemeService.createMemeImage(id, newArray);
            if (!captionedMeme.success)
                return;
            const { error } = yield supabase_1.supabase
                .from('meme')
                .update({ url: captionedMeme.data.url, texts: newArray })
                .eq('id', parseInt(id))
                .select();
            if (error) {
                throw error;
            }
            else {
                return {
                    id: meme.id,
                    name: meme.name,
                    url: captionedMeme.data.url,
                    texts: newArray
                };
            }
        });
    }
    static createMemeImage(id, texts) {
        return __awaiter(this, void 0, void 0, function* () {
            let objTexts = {};
            texts.forEach((t, i) => {
                objTexts[`text${i}`] = t;
            });
            const formatData = new URLSearchParams(Object.assign({ template_id: id, username: 'g_user_108829902778473979498', password: 'sfhasiufhse@#34' }, objTexts));
            const getCaptionedMeme = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.post("https://api.imgflip.com/caption_image", formatData.toString());
                return yield response.data;
            });
            const captionedMeme = yield getCaptionedMeme();
            return captionedMeme;
        });
    }
}
exports.MemeService = MemeService;
