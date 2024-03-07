import { MongoClient, CollationOptions } from "mongodb";

import express, { Request, Response, NextFunction } from "express";
const app = express();
import bodyParser from "body-parser";

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: 1024 }));
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter: any = {};
const projection: any = {};
const sort: any = {};
const collation: any = {};

MongoClient.connect("mongodb://localhost:27017/")
  .then((client) => {
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
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
          const coll = client.db("Test").collection("user");
          const cursor = coll.find(filter, { projection, sort, collation });
          const result = await cursor.toArray();
          await client.close();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

    app.listen(4500, () => {
      console.log("Port is listening on port 4500");
    });
  })
  .catch((error) => {
    console.log(error);
  });
