const Order=require("..//models/order")
const Cart=require("..//models/cart")

const addOrder=async (req,res)=>{
    try{
        const user = req.user
        const getCart = await Cart.findAll(user._id);
        const totalCart = getCart.map((item) => ({ cartId: item._id.toString() }));
        
        const order=await new Order(totalCart, user._id)
        await order.save()

        return res.status(200).send(order)

    }
    catch(err){
        return res.status(500).send("bad request")
    }
}
module.exports={addOrder}
