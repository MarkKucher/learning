import { ObjectId } from "mongodb";

export default class Meme {
    constructor(public name: string, public url: string, public texts: string[], public createdAt: Date, public templateId: string, public _id?: ObjectId) {}
}