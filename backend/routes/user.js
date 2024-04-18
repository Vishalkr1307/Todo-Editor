const express=require("express")
const router=express.Router()
const {Register,Login,getUser,getSingleUser}=require("..//controllers/user")

router.post("/register",Register)
router.post("/login",Login)
router.get("/allUser",getUser)
router.get("/user/:id",getSingleUser)


module.exports=router