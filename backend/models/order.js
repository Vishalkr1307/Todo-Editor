const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    totalCart:[{cartId:{type:mongoose.Schema.Types.ObjectId,ref:'Cart'}}],
    UserId:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}
},{
    versionKey:false,
    timestamps:true,
}
)

module.exports =mongoose.model("Order", orderSchema)

// const { getDb } = require("..//config/db");

// class Order {
//   constructor(CartId, UserId) {
//     this.CartId = CartId;
//     this.UserId = UserId;
//   }
//   save() {
//     const database = getDb();
//     return database
//       .collection("orders")
//       .insertOne(this)
//       .then((data) => data);
//   }
//   static find() {
//     const database = getDb();
//     return;
//   }
// }

// module.exports = Order;
