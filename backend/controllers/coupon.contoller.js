import Coupon from "../models/coupon.model.js"

export const getCoupon = async(req , res)=>{
    try {

        const userId = req.user._id 
        const coupons = await Coupon.findOne({userId:userId , isActive: true});
        res.json(coupons||null);

    } catch (error) {
        console.log("Error in fetching coupon controller" , error.message)
        res.status(500).json({message: 'Server Error, ' , error: error.message})
    }

}

export const validateCoupon = async (req ,res)=>{
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code:code , userId: req.user._id , isActive: true })
        
        if(!coupon){
            return res.status(404).json({message:"Coupon not found"})
        }
        if(coupon.expirationDate > new Date() ){
            coupon.isActive = false
            await coupon.save();
            return res.status(404).json({message: "Coupon date expired"})

        } 

        res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log("Server Error, ", error.message)
        res.status(404).json({ message: 'Server Error' , error: error.message})
    }
}

