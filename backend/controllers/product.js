const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const product = await new Product(title, price, description);
    // console.log(product)
    await product.save();

    return res.status(201).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Bad Request");
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
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
module.exports = { addProduct, getProduct, getSingleProduct };
