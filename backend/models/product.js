const { ObjectId } = require("mongodb")
const {getDb}=require("../config/db")
// const ObjectId = require('mongodb').ObjectId



class Product{
    constructor(title,price,description,image_url){
        this.title=title
        this.price=price
        this.description=description
        // this.image_url=image_url

    }
    save(){
        
        const database=getDb()
        database.collection("products").insertOne(this).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        });
    }
    static findAll(){
        const database=getDb()
        return database.collection("products").find().toArray().then((product)=>product)
    }

    static findById(id) {
        const database = getDb();
        return database.collection("products").findOne({ _id:new ObjectId(id) });
    }

    static findOne(key, value) {
        const database = getDb();
        const query = {};
        query[key] = value;
        return database.collection("products").findOne(query);
    }
    
    
    

    
    


}



module.exports = Product