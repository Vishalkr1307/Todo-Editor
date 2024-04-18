const express=require("express")
const router=express.Router()
const {addProduct,getProduct,getSingleProduct,updateProduct,deleteProduct}=require("../controllers/product")

router.post("/addProduct",addProduct)
router.get("/getProduct",getProduct)
router.get("/getProduct/:id",getSingleProduct)
router.patch("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)




module.exports =router
