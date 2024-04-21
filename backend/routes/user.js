const express=require("express")
const router=express.Router()
const {Register,Login,getUser,getSingleUser,OtpVerification,ForgetPassword,ResetPassword,ResendOtp,getProfile}=require("..//controllers/user")
const {nameChain,emailChain,passwordChain,otpChain}=require("..//utils/valdation")
const Authonicate=require("..//middlewares/authonicate")

router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/login",emailChain(),Login)
router.post("/otpverification/:id",otpChain(),OtpVerification)
router.get("/resendotp/:id",ResendOtp)
router.post("/forgetpassword",emailChain(),ForgetPassword)
router.post("/forgetpassword/resetpassword/:id",passwordChain(),ResetPassword)
router.get("/allUser",getUser)
router.get("/user/:id",getSingleUser)
router.get("/profile",Authonicate,getProfile)


module.exports=router