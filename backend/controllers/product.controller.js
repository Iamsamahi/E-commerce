import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";



export const getAllProducts = async(req , res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        console.log("Error fetching products: ", error.message);
        res.status(500).json({message: `Internal Server Error:` + error.message}); 
    }
}

export const getFeaturedProducts = async(req , res) =>{
    // check if the products is in the Redis cache first

    try{
        const featuredProducts = await redis.get('Featured_Products');

        if(featuredProducts){
            return res.status(200).JSON({products: JSON.parse(featuredProducts)});
        }

        //If not in cache , fetch from the DB 

       featuredProducts = await Product.find({isFeatured:true}).lean(); 

        if(!featuredProducts || featuredProducts.length === 0){
            return res.status(404).JSON( {message: "No featured products found"});
        }  
        
        //Storing the featured products in Redis cache for future requests
        await redis.set('Featured_Products', JSON.stringify(featuredProducts));


}catch(error){
    console.log("Error fetching featured products: ", error.message);
    res.status(500).json({message: `Internal Server Error:` + error.message}); 
}
}

export const createProduct = async(req , res) =>{
    try{
        const{name , description , price , catagory , image} = req.body;

        const cloudinaryResponse = null;

        if(image){
                cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: 'products' } );
        }
        
        const Product = await Product.create({
            name,
            description,
            price,
            catagory,
            image: cloudinaryResponse?.secure_url?cloudinaryResponse.secure_url:"",
        })
        res.status(201).JSON({message: "A new product created successfully", product: Product});
    }   

    catch(error){
        console.log("Error creating product: ", error.message);
        res.status(500).json({message: `Internal Server Error:` + error.message}); 
    }
}

export const deleteProduct = async(req , res) =>{
    try{
        const {productID} = await Product.findById(req.params.id) 
        if(productID){
            await Product.findByIdAndDelete(productID);
            await cloudinary.uploader.destroy(productID.image.public_id);
            res.status(200).json({message: "Product deleted successfully"});
        }
    }catch{
        console.log("Error deleting product: ", error.message);
        res.status(500).json({message: `Internal Server Error:` + error.message});
    }
}

export const getRecommendedProducts = async(req , res)=> {
    try {
        const products = await Product.aggregate([
            { $sample: {size:3}} , 
            { $project: {
                _id:1,
                name:1,
                description:1,
                price:1,
                image:1,
            }}
        ])
        res.status(200).json({products});
    } catch (error) {
        console.log("Error fetching recommended products: ", error.message);
    }
}

export const getProductsByCatagory = async(req , res) =>{
    try {
      const { catagory } = req.params;
      const products = await Product.find({ catagory: catagory });  
      res.status(200).JSON({products});

    } catch (error) {
    console.log("Error fetching products by catagory: ", error.message);
    res.status(500).JSON({message: `Internal Server Error:` + error.message});       
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();

        await updateFeaturedProductsCache();

        return res.status(200).json({
            message: "Product featured status updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.log("Error toggling featured product:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set(
            "Featured_Products",
            JSON.stringify(featuredProducts),
            "EX",
            3600
        );
    } catch (error) {
        console.log("Error updating featured products cache:", error.message);
    }
}
