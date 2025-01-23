import userModel from "../models/userModel.js";

const addToCart = async(req,res) =>{
    try {
        const {userId, itemId} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if(cartData[itemId].quantity){
                cartData[itemId].quantity += 1;
            }else{ 
                cartData[itemId].quantity = 1;
            }
        }else{
            cartData[itemId] = {quantity: 1};
        }
        console.log(cartData);
        await userModel.findByIdAndUpdate (userId, {cartData: cartData});
        res.status(200).json({message: "Item added to cart"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCart = async(req,res) =>{
    try {
        const {userId, itemId, newQuantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData

        cartData[itemId].quantity = newQuantity;

        await userModel.findByIdAndUpdate(userId, {cartData: cartData});
        res.status(200).json({message: "Cart updated"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

const getUserCart = async(req,res) =>{
    try{
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        res.status(200).json({cartData: cartData});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export {addToCart, updateCart, getUserCart}


