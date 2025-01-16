import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// addProduct totalProdcut deleteProduct productDetails

const addProduct = async (req, res) => {
    // images logic only implemented but uploading image not working
    try{
        
        const {title, description, price, category, subCategory, sizes, bestseller} = req.body;
        //const image1 = req.files.image1[0];
        const images =[];
        if (req.files && req.files.image1 && req.files.image1[0]) images.push(req.files.image1[0]);
        if (req.files && req.files.image2 && req.files.image2[0]) images.push(req.files.image2[0]);
        if (req.files && req.files.image3 && req.files.image3[0]) images.push(req.files.image3[0]);
        if (req.files && req.files.image4 && req.files.image4[0]) images.push(req.files.image4[0]);
        
        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});// upload the image to cloudinary
                return result.secure_url; // return the image url
            })
        )
        // create a new product

        const newProduct = new productModel({
            title: title,
            description: description,
            category: category,
            subCategory: subCategory,
            price: Number(price),
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true'? true: false,
            image: imagesUrl,
            date: Date.now()
        })
         await newProduct.save(); // save the product to the database

        res.status(201).json({ message: 'Product added successfully' });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const totalProdcuts = async (req, res) => {
    try{
        const products = await productModel.find({}); // get all the products from the database
        res.status(200).json({products: products}); // respond with the
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.body; // get the product id
        await productModel.findByIdAndDelete(id); // delete the product from the database
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const productDetails = async (req, res) => {
    try {
        const id = req.params.id; // get the product id
        console.log(id);
        const product = await productModel.findById(id); // get the product from the database
        res.status(200).json({product: product}); // respond with the product
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
} 

export { addProduct, totalProdcuts, deleteProduct, productDetails }; // export the functions