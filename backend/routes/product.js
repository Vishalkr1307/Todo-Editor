const express=require("express")
const router=express.Router()
const {addProduct,getProduct,getSingleProduct}=require("../controllers/product")

router.post("/addProduct",addProduct)
router.get("/getProduct",getProduct)
router.get("/getProduct/:id",getSingleProduct)




module.exports =router
