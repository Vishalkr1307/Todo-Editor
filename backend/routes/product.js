const express=require("express")
const router=express.Router()
const authonicate=require("..//middlewares/authonicate")
const {addProduct,getProduct,getSingleProduct,updateProduct,deleteProduct}=require("../controllers/product")
const {titleChain,priceChain,descriptionChain,taskStatusChain}=require("..//utils/valdation")

router.post("/addProduct",authonicate,titleChain(),priceChain(),descriptionChain(),taskStatusChain(),addProduct)
router.get("/getProduct",authonicate,getProduct)
router.get("/getProduct/:id",authonicate,getSingleProduct)
router.patch("/updateProduct/:id",authonicate,updateProduct)
router.delete("/deleteProduct/:id",authonicate,deleteProduct)




module.exports =router
