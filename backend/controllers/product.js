const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const user = req.user;

    const product = await Product.create({ ...req.body, UserId: user._id });

    return res.status(201).send(product);
  } catch (err) {
    // console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const getProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = await Product.find({UserId: user._id}).populate({path:'UserId',select:'name'}).lean().exec()
    

    return res.status(201).send(product);
  } catch (err) {
    // console.error(err);
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body,);
    if(!product){
        return res.status(404).send("Product not found");
    }

    return res.status(201).send(product);
  } catch (err) {
    
    return res.status(500).send("Bad Request");
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return res.status(404).send("Product not found");
    }

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
