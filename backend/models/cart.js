const { ObjectId } = require("mongodb");
const {getDb}=require("..//config/db")

class Cart{
    constructor(UserId,ProductId){
        this.UserId=UserId;
        this.ProductId=ProductId;

    }
    save(){
        const database=getDb()
        database.collection("carts").insertOne(this).then((cart)=>cart)
    }
    static findAll(userId){
        const database=getDb()
        return database.collection("carts").find({UserId:userId}).toArray().then((cart)=>cart)
    }
    static delete(productId,userId){
        const database=getDb()
        return database.collection("carts").deleteOne({$and:[{_id:new ObjectId(productId)},{UserId:userId}]})

    }
}

module.exports = Cart