const { ObjectId } = require("mongodb")
const {getDb}=require("../config/db")
const bcrypt=require("bcrypt")

class User{
    constructor(name, email, password){
        this.name = name
        this.email = email
        this.password = bcrypt.hashSync(password,8)
    }
    save(){
        const database=getDb()
        database.collection("users").insertOne(this)
    }
    static findOne(data){
        const database=getDb()
        return database.collection("users").findOne(data)

    }
    static findAll() {
        const database=getDb()
        return database.collection("users").find().toArray().then((user)=>user)
    }
    static findById(id) {
        const database=getDb()
        return database.collection("users").findOne({_id:new ObjectId(id)})

    }
    static findByIdAndUpdate(id,data){
        const database = getDb();
 
        return database.collection("users").updateOne({_id:new ObjectId(id)},{$set:data}).then((product)=>product)
 
 
     }
     static findByIdAndDelete(id) {
         const database = getDb();
     
         return database.collection("users").deleteOne({ _id: new ObjectId(id) });
     }
}

module.exports = User
