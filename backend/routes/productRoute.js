import express from 'express';

import { addProduct, totalProdcuts, deleteProduct, productDetails} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,
    upload.fields([
        {name:'image1', },
        {name:'image2', },
        {name:'image3', },
        {name:'image4', }
    ])
     ,addProduct);

productRouter.get('/total', totalProdcuts);

productRouter.delete('/delete', adminAuth,deleteProduct);

productRouter.get('/details/:id', productDetails);

export default productRouter;
