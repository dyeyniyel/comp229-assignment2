/*
File name: controllers/product.controller.js
Student Name: Janiel Mark Javier
Student ID: 301379377
Date: 06/17/2024
*/

const productModel = require("../models/product.model");

//function to get all products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();    //Find all products in the database
    res.json(products);   //Send the products as a response
  } catch (error) {
    res.status(500).json({ message: error.message });  //Send error message if any error occurs
  }
};


//Function to get product by ID
module.exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);  //Find the product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' });  //If product not found, send 404 status
    res.json(product);        //Send the product as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Function to Add new product
module.exports.addProduct = async (req, res) => {
  const product = new productModel(req.body);

  try {
    const newProduct = await product.save(); //Save the new product to the database
    //   res.json({ message: 'Successfully added', Product: newProduct });
    res.json(newProduct);
  } catch (error) {    //If a duplicate key error occurs, send a 400 status
    if (error.code === 11000) { // Duplicate key error code
      res.status(400).json({ message: 'Product with the same name, description, price, quantity, and category already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};


//Function to Update product by ID
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    //Update product details if provided in the request body
    if (req.body.name != null) product.name = req.body.name;
    if (req.body.description != null) product.description = req.body.description;
    if (req.body.price != null) product.price = req.body.price;
    if (req.body.quantity != null) product.quantity = req.body.quantity;
    if (req.body.category != null) product.category = req.body.category;

    //Save the updated product to the database
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Function to Delete product by ID
module.exports.deleteProductByID = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const result = await productModel.deleteOne();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to Delete all products
module.exports.deleteAllProducts = async (req, res) => {
  try {
    const result = await productModel.deleteMany();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Function to Find products by name
module.exports.findProductsByName = async (req, res) => {
  let name = req.query.name;

  //If 'name' is not provided in the request, call the 'getAllProducts' function
  if (!name) {
    return module.exports.getAllProducts(req, res);
  }

  //Check if name starts and ends with square brackets []. This is so that api/products?name=[kw] will find all products which name contains 'kw'
  if (name.startsWith('[') && name.endsWith(']')) {
    // Extract the word inside square brackets and remove them
    name = name.slice(1, -1);
  } else {
    // Escape special regex characters in the name
    name = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  try {
    //Find products by name using regex
    const products = await productModel.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

