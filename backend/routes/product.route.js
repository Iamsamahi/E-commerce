import express from 'express';
import { protectRoute ,adminRoute } from '../middleware/auth.middleware.js';
import { getAllProducts , getFeaturedProducts,createProduct,deleteProduct,getRecommendedProducts,getProductsByCatagory,toggleFeaturedProduct} from '../controllers/product.controller.js';

const router = express.Router();


// Define product routes here
router.get("/", protectRoute,adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.get("/featured", getFeaturedProducts);
router.get("/catagory/:catagory", getProductsByCatagory);
router.delete("/:id", protectRoute, adminRoute,deleteProduct);
router.get("/recommended" , getRecommendedProducts);
router.patch("/:id", protectRoute, adminRoute,toggleFeaturedProduct ); // Update product route placeholder


export default router;


