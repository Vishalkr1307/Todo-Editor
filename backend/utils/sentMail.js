const nodemailer = require("nodemailer");

const OtpVerification=require("..//models/otp")
const User=require("..//models/user")
require("dotenv").config();
const bcrypt=require("bcrypt")
const mailgen=require("mailgen")

module.exports = async (email) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const user=await User.findOne({email:email}).lean().exec();

  if(!user){
    return ("Email not found")
  }
  

  const otp=Math.round(Math.random()*9000+1000)
  const hashOtp=bcrypt.hashSync(otp.toString(),8)

  const otpData=await OtpVerification.create({
    otp:hashOtp,
    userId:user._id,
    createdAt:new Date(),
    expiredAt:new Date(new Date().getTime()+60*1000*2) 


  })
  await otpData.save()
  const MailGenerator=new mailgen({
    theme:"default",
    product:{
        name:"Data-Task",
        link:"http://localhost:2345"
    }

  })

  const emailData = {
    body: {
        name: user?.name,
        intro: 'Welcome to Data-Task! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started Data-Task, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: otp,
                
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

const emailBody=MailGenerator.generate(emailData)
const emailText=MailGenerator.generatePlaintext(emailData)

const info=await transporter.sendMail({
    from:process.env.GMAIL_EMAIL,
    to:user?.email,
    subject:"For Otp verification",
    text:emailText,
    html:emailBody
})

return {
    status:`Otp send your ${user?.email}`,
    email:user?.email,
    userId:user._id

}



  
  
};
