import orderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables

const currency = "egp";
const shipping = 50;

//geteway for stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order using COD method (cash on delivery)
const placeOrder = async (req, res) =>{

    try{

        const {userID, items, amount, address} = req.body;

        if(items.length === 0){
            return res.status(400).json({message: "Cart is empty"});
        }

        const order = {
            userID,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        };
        const newOrder = new orderModel(order);
        await newOrder.save();
        const user = await userModel.findById(userID);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        else{
            user.cartData = {};
        }
        //await userModel.findByIdAndUpdate(userID, {cartData: {}});


        res.status(200).json({message: "Order Placed Successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Placing order using Stripe method
const placeOrderStripe = async (req, res) =>{
    try {
        const {userID, items, amount, address} = req.body;
        const {origin} = req.headers; // get the origin from the headers

        const order = {
            userID,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(order);
        await newOrder.save();

        const line_item = items.map((item) =>({
            price_data: {
                currency:currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_item.push({
            price_data: {
                currency: currency,
                product_data: {
                name: "Shipping"
                },
                unit_amount: shipping*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?succes=true&orderID=${newOrder._id}`,
            cancel_url:`${origin}/verify?succes=false&orderID=${newOrder._id}`,
            line_items: line_item,
            mode: "payment",
        })

        res.status(200).json({id: session.id});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// verify stripe payment
const verifyPayment = async (req, res) =>{
    try {
        const {orderID, success, userID} = req.body;
        if (success ==="true"){
            await orderModel.findByIdAndUpdate(orderID,{payment: true});
            await userModel.findByIdAndUpdate(userID, {cartData: {}});
            res.status(200).json({message: "Payment Successful"});
        }else{
            await orderModel.findByIdAndDelete(orderID);
            res.status(400).json({message: "Payment Failed"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});   
    }
}

// place order using Razorpay method
const placeOrderRazorpay = async (req, res) =>{

}

// all orders for admin panel
const allOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({});
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// user order for Frontend
const userOrder = async (req, res) =>{
    try {
        const {userID} = req.body;

        const order = await orderModel.find({userID});
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update order status for admin panel

const updateOrderStatus = async (req, res) =>{

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrder, updateOrderStatus, verifyPayment}