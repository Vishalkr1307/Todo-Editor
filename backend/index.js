const express=require("express")
const app = express()
const Product=require("./routes/product")
const User=require("./routes/user")
app.use(express.json())

app.use('/products',Product)
app.use('/auth',User)




app.get("/",(req,res)=>{
    // console.log(process.pid)
    return res.status(200).json({
        message:process.pid
    })
})

module.exports=app