const Cart=require("..//models/cart")
const addCart=async (req, res, next) => {
    try{
        const user = req.user
        const {ProductId}=req.body
        const getCart=await Cart.findAll(user._id)
        const data=getCart.map((item)=>item.ProductId)
        if(data.includes(ProductId)){
            return res.status(400).send("Product has already been added on cart")
        }
        const cart=await new Cart(user._id,ProductId)
        await cart.save()

        return res.status(200).send(cart)

    }
    catch(err){
        console.error(err)
        return res.status(500).send("bad request");
    }
}
const getCart=async (req, res, next) => {
    try{
        const user=req.user
        const cart=await Cart.findAll(user._id)
       
        

        return res.status(200).send(cart)

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}
const deleteCart=async (req, res, next) => {
    try{
        const user=req.user
        const cart=await Cart.delete(req.params.productId,user._id)
        console.log(cart)
        return res.status(200).send("Cart successfully deleted")

    }
    catch(err){
        
        return res.status(500).send("bad request");
    }
}

module.exports ={addCart,getCart,deleteCart}
