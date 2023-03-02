const { MongoClient } = require('mongodb');
// const mongoClient = require('mongodb').MongoClient;   

const url = `mongodb://localhost:27017`;
const client = new MongoClient(url);

//connect database and find data
async function getData() {
    let result = await client.connect();
    let db = result.db('e-comm');
    let collection = db.collection('products');
    let response = await collection.find({}).toArray();
    console.log(response);
}
getData();
