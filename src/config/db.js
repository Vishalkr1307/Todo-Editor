const mongodb=require("mongodb")

const mongoClient=mongodb.MongoClient
require("dotenv").config()

module.exports=()=>{
    return mongoClient.connect(process.env.DB).then((res)=>console.log("Connected to MongoDB")).catch(()=>console.log("couldn't connect to MongoDB"))
}