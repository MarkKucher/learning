import express, {Application, json, urlencoded} from 'express';
import "dotenv/config";
import cors from "cors"
import {router} from "./router";
import {connectToDatabase} from "./database/services/database.service";
import {memesRouter} from "./database/routes/memes.router";

const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://learning-rosy.vercel.app']
}

app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: true }));

router(app)

connectToDatabase().then(() => {
    app.use("/memes", memesRouter);
}).catch((error: Error) => {
    console.error("Database connection failed", error);
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});