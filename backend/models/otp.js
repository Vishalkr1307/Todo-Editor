const mongoose=require("mongoose")
const otpSchema=new mongoose.Schema({
    userId:{type:"string",required:true},
    otp:{type:"string",required:true},
    createdAt:Date,
    expiredAt:Date,
})

module.exports=mongoose.model('Otp',otpSchema)