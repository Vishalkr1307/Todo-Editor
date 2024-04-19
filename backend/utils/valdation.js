const {body}=require("express-validator")
const formatOfError=(errorOfArray)=>{
    return errorOfArray.map((err)=>err.msg)
}

const emailChain=()=>body("email").notEmpty().withMessage("email not be empty").isEmail().withMessage("it must be a valid email")
const nameChain=()=>body("name").notEmpty().withMessage("name is not empty").isString().withMessage("it must be a valid name")
const passwordChain = () =>
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters")
    .custom(async (val) => {
      for (var i = 0; i < val.length; i++) {
        if (val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 || val.charCodeAt(0) >=48 && val.charCodeAt(0) <=57){
          throw new Error("First character must Be Uppercase");
        }
      }
    });
const otpChain=()=>body("otp").notEmpty().isString().isLength({min:4,max:4}).withMessage("Otp have 4 digit")

module.exports ={formatOfError,emailChain,passwordChain,nameChain,otpChain}
