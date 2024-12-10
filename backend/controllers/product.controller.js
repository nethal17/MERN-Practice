import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async(req, res) => { //fetch all products
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });

    } catch(error){
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createProduct = async (req, res) => { //create
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });

    } catch(error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => { //update
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updateProduct });

    } catch(error){
        res.status(500).json({ success: true, message: "Server Error"  });
    }

}

export const deleteProduct = async(req, res) => { //delete
    const{ id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });

    } catch(error){
        console.log("Error in deleting product: ", error.message);
        res.status(500).json( {success: false, message: "Server Error" });
    }
}