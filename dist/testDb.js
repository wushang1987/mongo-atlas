"use strict";

const {
  MongoClient
} = require("mongodb");
const username = encodeURIComponent("WWD");
const password = encodeURIComponent("nawb4jmXytHUu90v");
const cluster = "cluster0.tfwzmi6.mongodb.net";
// const authSource = "<authSource>";
// const authMechanism = "<authMechanism>";

// let uri = `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`;
const client = new MongoClient(uri);

// mongodb+srv://<db_username>:<db_password>@cluster0.tfwzmi6.mongodb.netlet uri = `mongodb+srv://${username}:${password}@${cluster}/`;

async function run() {
  try {
    await client.connect();
    const database = client.db("todo");
    const ratings = database.collection("Item");
    const cursor = ratings.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);