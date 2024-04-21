const User = require("..//models/user");
const OtpSchema=require("..//models/otp")
const bcrypt = require("bcrypt");
const { newToken } = require("..//utils/token");
const { validationResult } = require("express-validator");
const { formatOfError } = require("..//utils/valdation");
const sentMail = require("..//utils/sentMail");

const Register = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res.status(404).send("User already exists");
    }
    user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};
const Login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("user not found");
    }
    const checkPassword = user.checkPassword(req.body.password);
    if (!checkPassword) {
      return res.status(200).send("password does not match");
    }
    const sendData = await sentMail(user.email);

    return res.status(200).send(sendData);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};
const OtpVerification = async (req, res) => {
  try {
    const id = req.params.id;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOfError(error.array()).join(","));
    }
    const user = await OtpSchema.find({userId:id}).lean().exec()
    

    if (user.length == 0) {
      return res.status(400).send("User not found");
    }
    const { otp, expiredAt } = user[user.length - 1];

    if (new Date(expiredAt).getTime() < new Date().getTime()) {
      await OtpSchema.deleteMany({userId:id})
        
      return res.status(400).send("Your otp has expired");
    } else {
      const matchOtp = bcrypt.compareSync(req.body.otp, otp);
      if (!matchOtp) {
        return res.status(400).send("Your otp has wrong");
      }
      await OtpSchema.deleteMany({userId:id})
        
      await User.findByIdAndUpdate(id,{verifya:true})
        
      const updateUser = await User.findById(id)
        

      const token = newToken(updateUser);
      return res
        .status(200)
        .send({ status: "Your Otp have successfully verified", token });
    }
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
const ForgetPassword = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOfError(error.array()).join(","));
    }
    const user=await User.findOne({email: req.body.email})

    if (!user) {
      return res.status(401).send("User not found");
    }
    const sendData = await sentMail(user.email);

    return res.status(200).send(sendData);
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
const ResetPassword = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOfError(error.array()).join(","));
    }
    const id = req.params.id;
    await User.findByIdAndUpdate(id,{password:bcrypt.hashSync(req.body.password,8)})
      
    return res
      .status(200)
      .send({ status: "Yor password successfully updated" });
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
const ResendOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if(!user){
      return res.status(404).send("user not found");
    }

    await OtpSchema.deleteMany({userId:id})
    const sendData = await sentMail(user.email);
    return res.status(200).send(sendData);
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};

module.exports = { Register, Login, getUser, getSingleUser,OtpVerification,ForgetPassword,ResetPassword,ResendOtp };
