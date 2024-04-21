const express=require("express");
const router=express.Router()
const {Payment,updatePremium}=require("..//controllers/payment")
const Authonicate=require("..//middlewares/authonicate")

router.get("/premium",Authonicate,Payment)
router.post("/updatePremium",Authonicate,updatePremium)

module.exports = router