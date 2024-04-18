const {newToken, verifyaToken}=require("..//utils/token")

module.exports = async (req,res,next)=>{
   
        
        if(!req?.headers?.authorization) return res.status(400).send("please provide authorization token");
        const bearerToken =req?.headers?.authorization
        if(!bearerToken.startsWith("Bearer")) return res.status(400).send("please provide bearer token");
        const token=bearerToken.split(" ")[1]
        let user=await verifyaToken(token)
        req.user=user.user
        next()
    
    

}