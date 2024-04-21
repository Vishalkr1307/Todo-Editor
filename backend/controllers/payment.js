const razorpay=require("razorpay")
const paymentSchema=require("..//models/payment")
const User=require("..//models/user")

require("dotenv").config()

const Payment=async (req,res)=>{
    try{
        const user=req.user
        const amount=2500
        const rzp=new razorpay({
            key_id: process.env.RAZOR_ID,
            key_secret: process.env.RAZOR_SECRET,
        })
        
        const order=await rzp.orders.create({
            amount: amount,
            currency:"INR"
        })
        const data=await paymentSchema.create({
            orderId: order.id,
            paymentStatus:"PENDING",
            UserId:user._id
        })

        return res.status(200).send({data:data,key_id:rzp.key_id})

    }
    catch(err){
        return res.status(500).send("Bad request")
    }
}

const updatePremium=async(req,res)=>{
    try{
        const user=req.user
        await paymentSchema.findOneAndUpdate({orderId:req.body.orderId},{paymentId:req.body.paymentId,paymentStatus:req.body.paymentStatus})
        await User.findByIdAndUpdate(user._id,{isPremium:true})

        return res.status(200).send("payment updated")

    }
    catch(err){
        return res.status(500).send("Bad request")
    }
}

module.exports ={Payment,updatePremium}