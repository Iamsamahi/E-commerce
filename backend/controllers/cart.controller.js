import Product from "../models/product.model.js";

export const addToCart = async(req , res)=>{
    
    try{

        const {productId} =req.body;
        const user =req.user;

        const existingCartItem = user.cartItems.find(item => item.id === productId);
        if(existingCartItem){
            existingCartItem.quantity +=1;
        }else{
            user.cartItems.push({id:productId , quantity:1});
        }
        await user.save();
        res.json(user.cartItems);
    }catch(error){
        console.log("Error adding to cart: ", error.message);
        res.status(500).json({message: `Internal Server Error:` + error.message});
    }
}

export const getCartproducts = async (req, res) => {
  try {
    const user = req.user;
    const cartItems = user.cartItems;

    if (cartItems.length === 0) {
      return res.json([]);
    }

    const productIds = cartItems.map(item => item.id);

    const products = await Product.find({
      _id: { $in: productIds }
    });

    const cartProducts = products.map(product => {
      const cartItem = cartItems.find(
        item => item.id.toString() === product._id.toString()
      );

      return {
        ...product.toObject(),
        quantity: cartItem.quantity
      };
    });

    res.json(cartProducts);

  } catch (error) {
    console.log("Error fetching cart products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const removeAllFromCart = async(req , res)=>{

    try{
        const user = req.user ; 
        const {productId} = req.body ;

        if(!productId){
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter(item => item.id !== productId); // Remove specific item from cart    
        }
        await user.save();
        res.json(user.cartItems);
    }catch(error){
        console.log("Error removing from cart: ", error.message);
        res.status(500).json({message: `Internal Server Error:` + error.message});
    }

}

export const updateQuantityInCart = async(req , res)=>{
try {
    const user = req.user ;
    const { productId } = req.params ;
    const { quantity } = req.body ;
    const existingCartItem = user.cartItems.find(item => item.id === productId)

    if(existingCartItem){
        if(quantity === 0){
            user.cartItems = user.cartItems.filter(item => item.id !== productId); //if the quantity is 0 then simply remove the item from cart
            await user.save();
            return res.json(user.cartItems);
        }
         existingCartItem.quantity = quantity;
            await user.save(); 
            res.json(user.cartItems);
     
    }else{ return res.status(404).json({message: "Product not found in cart"}); }    

    }catch(error){
    console.log("Error updating cart quantity: ", error.message);
    res.status(500).json({message: `Internal Server Error:` + error.message}) 
    }

}
