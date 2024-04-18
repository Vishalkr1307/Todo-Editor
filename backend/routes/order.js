const express=require("express")
const router=express.Router()
const {addOrder}=require("..//controllers/order")
const authonicate=require("..//middlewares/authonicate")

router.post("/addOrder",authonicate,addOrder)




module.exports=router