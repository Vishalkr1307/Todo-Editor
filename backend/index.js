const express=require("express")
const app = express()
const cors=require("cors")
const Product=require("./routes/product")
const User=require("./routes/user")
const Cart=require("./routes/cart")
const Order=require("./routes/order")
const Payment=require("./routes/payment")
app.use(express.json())
app.use(cors())

app.use('/products',Product)
app.use('/auth',User)
app.use("/cart",Cart)
app.use("/order",Order)
app.use("/payment",Payment)




app.get("/",(req,res)=>{
    // console.log(process.pid)
    return res.status(200).json({
        message:process.pid
    })
})

module.exports=app