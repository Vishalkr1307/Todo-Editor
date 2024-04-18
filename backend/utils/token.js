const jwt=require("jsonwebtoken")
require("dotenv").config()

const newToken=(user)=>{
    console.log(process.env.PRIVATE_KEY)
    return jwt.sign({user:user,exp:Date.now()+60*1000*60*24},process.env.PRIVATE_KEY)
}

const verifyaToken=(token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }
            resolve(decoded)

        })
    })

}

module.exports ={newToken,verifyaToken}
