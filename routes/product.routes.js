/*
File name: routes/product.routes.js
Student Name: Janiel Mark Javier
Student ID: 301379377
Date: 06/17/2024
*/

var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')


// CRUD routes
/*router.get('/api/products', productController.findProductsByName);
router.get('/api/products', productController.getAllProducts);
router.post('/api/products', productController.addProduct);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProductByID);
router.delete('/api/products', productController.deleteAllProducts);
router.get('/api/products/:id', productController.getProductById); */



//simpler way of writing CRUD operations above

router.route('/api/products')
    .get(productController.findProductsByName); //Find products by name

router.route('/api/products')
    .get(productController.getAllProducts) //Get all products
    .post(productController.addProduct) //Add a new product
    .delete(productController.deleteAllProducts); //Delete all products


router.route('/api/products/:id')
    .get(productController.getProductById) //Get a product by ID
    .put(productController.updateProduct) //Update a product by ID
    .delete(productController.deleteProductByID); //Delete a product by ID

module.exports = router;