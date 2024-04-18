const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const user=req.user
    // console.log(user)
    const { title, price, description} = req.body;
    
    const product = await new Product(title, price, description,user._id);
    
    await product.save();

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const getProduct = async (req, res) => {
  try {
    const user=req.user
    const product = await Product.findAll(user._id);
    // console.log(product)

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
module.exports = { addProduct, getProduct, getSingleProduct,updateProduct,deleteProduct };
