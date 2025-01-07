import express from 'express';

import { addProduct, totalProdcut, deleteProduct, productDetails} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', addProduct);

productRouter.get('/total', totalProdcut);

productRouter.delete('/delete/:id', deleteProduct);

productRouter.get('/details/:id', productDetails);

export default productRouter;
