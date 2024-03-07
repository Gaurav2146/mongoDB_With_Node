"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
// Middleware for parsing JSON bodies
app.use(body_parser_1.default.json());
// Middleware for parsing URL-encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: true, limit: 1024 }));
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
// Create database connection pool
const uri = "mongodb://localhost:27017/";
const client = new mongodb_1.MongoClient(uri, { maxPoolSize: 10, minPoolSize: 1 });
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
}
app.get("/", (req, res, next) => {
    fetchData()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(400).json({ error: error });
    });
});
async function fetchData() {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {};
            const projection = {};
            const sort = {};
            const collation = {};
            const coll = client.db("Test").collection("user");
            const cursor = coll.find(filter, { projection, sort, collation });
            const result = await cursor.toArray();
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
    });
}
app.listen(4500, async () => {
    console.log("Port is listening on port 4500");
    try {
        await connectToDatabase();
    }
    catch (error) {
        console.log(error);
    }
});
