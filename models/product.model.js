/*
File name: models/product.model.js
Student Name: Janiel Mark Javier
Student ID: 301379377
Date: 06/17/2024
*/

var mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    
    description: { 
        type: String, 
        required: true 
    },
    
    price: { 
        type: Number, 
        required: true 
    },

    quantity: { 
        type: Number, 
        required: true },

    category: {
         type: String, 
         required: true 
        },

}, 
);


// Create a compound index on name, description, price, quantity, and category
ProductSchema.index({ name: 1, description: 1, price: 1, quantity: 1, category: 1 }, { unique: true });


module.exports = mongoose.model('Product', ProductSchema);