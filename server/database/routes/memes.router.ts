import express from "express";
import {MemeController} from "../../meme-generator/MemeController";

export const memesRouter = express.Router();

memesRouter.use(express.json());

memesRouter.get('/', MemeController.getAll);
memesRouter.get('/:id', MemeController.getOne);
memesRouter.delete('/:id', MemeController.deleteOne);
memesRouter.patch('/:id', MemeController.patch);
memesRouter.post('/', MemeController.generate);
