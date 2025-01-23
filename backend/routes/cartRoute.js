import express from 'express';

import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post('/add', authUser,addToCart);

cartRouter.get('/get', authUser,getUserCart);

cartRouter.put('/update', authUser,updateCart);

export default cartRouter;