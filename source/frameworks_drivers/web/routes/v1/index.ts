import { Router } from 'express';
import { router as usersRouter } from './users/users_routes';
import { router as rolesRouter } from './roles/roles_routes';
import { router as productsRouter } from './products/products_routes';
import { router as salesRouter } from './sales/sales_routes';


const router = Router();

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/products', productsRouter);
router.use('/sales', salesRouter);

export { router };