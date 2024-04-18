const express=require("express")
const router=express.Router()
const {getCart,addCart,deleteCart}=require("..//controllers/cart")
const authonicate=require("..//middlewares/authonicate")
router.post("/addCart",authonicate,addCart)
router.get("/getCart",authonicate,getCart)
router.delete("/deleteCart/:productId",authonicate,deleteCart)

module.exports = router

