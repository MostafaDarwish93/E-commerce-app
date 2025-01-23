import express from 'express';
import {placeOrder, placeOrderStripe, placeOrderRazorpay,verifyPayment ,allOrders, userOrder, updateOrderStatus} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth ,allOrders); // get all orders for admin panel

orderRouter.post('/status',adminAuth ,updateOrderStatus); // update order status for admin panel

// payment Features

orderRouter.post('/place',authUser ,placeOrder); // place order using COD method (cash on delivery)

orderRouter.post('/placeStripe',authUser ,placeOrderStripe); // place order using Stripe method

orderRouter.post('/placeRazorpay',authUser ,placeOrderRazorpay); // place order using Razorpay method

// user features

orderRouter.post('/user',authUser ,userOrder); // user order for Frontend

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyPayment); // verify stripe payment

export default orderRouter;