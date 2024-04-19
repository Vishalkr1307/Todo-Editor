const express=require("express")
const router=express.Router()
const {Register,Login,getUser,getSingleUser,OtpVerification,ForgetPassword,ResetPassword,ResendOtp}=require("..//controllers/user")
const {nameChain,emailChain,passwordChain,otpChain}=require("..//utils/valdation")

router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/login",emailChain(),Login)
router.post("/otpverification/:id",otpChain(),OtpVerification)
router.get("/resendotp/:id",ResendOtp)
router.post("/forgetpassword",emailChain(),ForgetPassword)
router.post("/forgetpassword/resetpassword/:id",passwordChain(),ResetPassword)
router.get("/allUser",getUser)
router.get("/user/:id",getSingleUser)


module.exports=router