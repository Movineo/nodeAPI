import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, getProduct, getProducts } from './handlers/products';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router();

router.get('/product', getProducts);
router.get('/product/:id',getProduct);

router.put('/product/:id',body ('name'), handleInputErrors, (req, res)=> {
    

        
});

router.post('/product', body ('name').isString(), handleInputErrors, createProduct);

router.delete('/product/:id', () => {

}
);


/**
 * Update 
 */

router.get('/update', getUpdates
);

router.get('/update/:id', getUpdate
);

router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
    body('version').optional(),
    updateUpdate
);


router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('asset').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);

router.delete('/update/:id', deleteUpdate
);


/**
 * Update Points
 */

router.get('/updatepoint', () => {
      
    }
);

router.get('/updatepoint/:id', () => {
          
    }
);

router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    (req, res) => {
            
    }
);

router.post('/updatepoint',
body('name').exists().isString(),
body('description').exists().isString(),
body('updateId').exists().isString(),

(req, res) => {
        
}
);

router.delete('/updatepoint/:id', () => {

    }
);

export default router;
