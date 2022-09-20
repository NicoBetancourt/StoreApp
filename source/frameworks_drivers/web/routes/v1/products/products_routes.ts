import { Router } from 'express';
import  checkPermissions from 'frameworks_drivers/web/middleware/auth/check_permissions';
import { ProductController } from 'domain/modules/products/interface_adapters/web/controllers/product_controller';

const controller = new ProductController();

const router = Router();

router.post(
    '/create-one',
    checkPermissions('products:create'),
    controller.createOne
);
router.post(
    '/create-many',
    checkPermissions('products:create'),
    controller.createMany
);
router.get(
    '/get-all',
    checkPermissions('products:read'),
    // filter,
    controller.getAll
);
router.get(
    '/:id/get-one',
    checkPermissions('products:read'),
    controller.getById
);
router.put(
    '/:id/update-one',
    checkPermissions('products:update'),
    controller.updateOne
);
router.delete(
    '/:id/delete-one',
    checkPermissions('products:delete'),
    controller.deleteOne
);

export { router };
