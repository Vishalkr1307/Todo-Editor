const Order=require("..//models/order")
const Cart=require("..//models/cart")

const addOrder=async (req,res)=>{
    try{
        const user = req.user
        const getCart = await Cart.find({UserId:user._id})
        const totalCart = getCart.map((item) => ({ cartId: item._id.toString() }));
        const order=await Order.create({totalCart:totalCart,UserId:user._id})
        
        

        return res.status(200).send(order)

    }
    catch(err){
        console.log(err)
        return res.status(500).send("bad request")
    }
}
module.exports={addOrder}
