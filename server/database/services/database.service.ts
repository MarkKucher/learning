import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { memes?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();

    if(!process.env.DB_CONN_STRING || !process.env.MEMES_COLLECTION_NAME) {
        console.error(new Error("Local variables are missing"));
        return;
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const memesCollection: mongoDB.Collection = db.collection(process.env.MEMES_COLLECTION_NAME);

    collections.memes = memesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${memesCollection.collectionName}`);
}