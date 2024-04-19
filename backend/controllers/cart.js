const Cart=require("..//models/cart")
const addCart=async (req, res, next) => {
    try{
        const user = req.user
        const {ProductId}=req.body
        const getCart=await Cart.find({UserId:user._id})
        const data=getCart.map((item)=>item.ProductId.toString())
        
        if(data.includes(ProductId)){
            return res.status(400).send("Product has already been added on cart")
        }
        const cart=await Cart.create({ProductId:ProductId,UserId:user._id})
        

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
        const cart=await Cart.find({UserId: user._id}).populate({path:"UserId",select:"name"}).populate("ProductId")
       
        

        return res.status(200).send(cart)

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}
const deleteCart=async (req, res, next) => {
    try{
        const user=req.user
        const cart = await Cart.findOneAndDelete({ ProductId: req.params.productId, UserId: user._id });
         if(!cart){
            return res.status(404).send("Cart item not found")
         }
        
        return res.status(200).send("Cart successfully deleted")

    }
    catch(err){
        console.log(err)
        return res.status(500).send("bad request");
    }
}

module.exports ={addCart,getCart,deleteCart}
