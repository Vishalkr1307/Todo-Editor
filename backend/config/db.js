const mongoose=require("mongoose")
require("dotenv").config()

module.exports = ()=>{
    return mongoose.connect(process.env.DB).then(()=>console.log("Connect to MongoDB")).catch((err)=>console.log("Couldn't connect to MongoDB",err))
}
// const mongoDb = require("mongodb");
// const MongoClient = mongoDb.MongoClient;

// require("dotenv").config();

// let _db;

// const mongoConnect = () => {
//     return MongoClient.connect(process.env.DB)
//         .then((client) => {
//             console.log("Connected successfully to the database");
//             _db = client.db();
//         })
//         .catch((err) => {
//             console.log("Error connecting:", err);
//         });
// };

// function getDb() {
//     if (_db) {
//         return _db;
//     }
//     throw new Error("Connection not established");
// }

// module.exports = { mongoConnect, getDb };
