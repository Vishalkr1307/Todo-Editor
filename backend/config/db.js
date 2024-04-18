const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

require("dotenv").config();

let _db;

const mongoConnect = () => {
    return MongoClient.connect(process.env.DB)
        .then((client) => {
            console.log("Connected successfully to the database");
            _db = client.db();
        })
        .catch((err) => {
            console.log("Error connecting:", err);
        });
};

function getDb() {
    if (_db) {
        return _db;
    }
    throw new Error("Connection not established");
}

module.exports = { mongoConnect, getDb };
