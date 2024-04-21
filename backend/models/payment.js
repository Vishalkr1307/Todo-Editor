const mongoose=require("mongoose")


const paymentSchema=new mongoose.Schema({
    orderId:{type:String, required:true},
    paymentId:{type:String, required:false},
    paymentStatus:{type:String, required:false},
    UserId:{type:mongoose.Schema.Types.ObjectId,ref:"User",}
},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("Payment",paymentSchema)