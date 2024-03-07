"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.User = void 0;
const index_1 = require("../index");
class User {
    async fetchData() {
        return new Promise(async (resolve, reject) => {
            try {
                const filter = {};
                const projection = {};
                const sort = {};
                const collation = {};
                const coll = index_1.client.db("Test").collection("user");
                const cursor = coll.find(filter, { projection, sort, collation });
                const result = await cursor.toArray();
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.User = User;
exports.user = new User();
