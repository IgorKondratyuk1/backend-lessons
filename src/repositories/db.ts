import {MongoClient} from "mongodb";
import {UserDBType} from "../types/userTypes";
import {ProductType} from "../types/types";

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
export const mongoClient = new MongoClient(mongoURL);
const db = mongoClient.db("shop");
export const productsCollection = db.collection<ProductType>("products");
export const usersCollection = db.collection<UserDBType>("users");

export async function connectToDB() {
    try{
        await mongoClient.connect();
        await mongoClient.db("shop").command({ ping: 1 });
        console.log('Successfully connected to MongoDB!');
    } catch (error) {
        console.error('Connection to MongoDB! Error: ', error);
        await mongoClient.close();
    }
}