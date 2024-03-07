import {client} from "../index";

export class User{

    async fetchData() {
        return new Promise(async (resolve, reject) => {
          try {
            const filter: any = {};
            const projection: any = {};
            const sort: any = {};
            const collation: any = {};
      
            const coll = client.db("Test").collection("user");
            const cursor = coll.find(filter, { projection, sort, collation });
            const result = await cursor.toArray();
      
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
}

export let user =  new User();