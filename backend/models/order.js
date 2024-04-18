const {getDb}=require("..//config/db")

class Order{
    constructor(CartId,UserId) {
        this.CartId = CartId
        this.UserId = UserId

    }
    save(){
        const database=getDb()
        return database.collection("orders").insertOne(this).then((data)=>data)
    }
    static find(){
        const database=getDb()
        return 
    }
}

module.exports = Order