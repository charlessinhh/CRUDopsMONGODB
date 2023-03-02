const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:27017`;
const database = 'e-comm';
const client = new MongoClient(url);

async function dbConnect() {
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('products');
}


//find data 
dbConnect().then((data1) => {
    data1.find({}).toArray().then((data2) => {
        console.log(data2);
    });
    // data1.find({ name: 'charles' }).toArray().then((data2) => {
    //     console.log(data2);
    // });
});

//find data from db
const findData = async() => {
    let data = await dbConnect();
    data = await data.find({ name: 'harry sandhu' }).toArray();
    console.log(data);
}
findData();

// insert data into db
const insertData = async() => {
    const db = await dbConnect();
    const result = await db.insertMany(
        [{
                name: 'bittu',
                city: 'navi- mumbai'
            },
            {
                name: 'harry',
                city: 'london'
            }
        ])
    if (result.acknowledged == true) {
        console.log("inserted successfully");
    }
};
insertData();

// update data with new data in db
const updateData = async() => {
    let data = await dbConnect();
    let result = data.updateMany({
        name: 'harry'
    }, {
        $set: {
            name: 'harry sandhu',
            city: 'london UK'
        }
    });
    if ((await result).acknowledged === true) {
        console.log('data updated');
    }
};
updateData();

// delete data from db
const deleteData = async() => {
    const data = await dbConnect();
    const result = data.deleteMany({ name: '' });
    if ((await result).deletedCount > 0) {
        console.log('data deleted');
    }

}
deleteData();
