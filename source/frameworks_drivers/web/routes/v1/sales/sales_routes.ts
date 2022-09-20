import { SaleController } from 'domain/modules/sales/interface_adapters/web/controllers/sale_controller';
import { Router } from 'express';
import  checkPermissions from 'frameworks_drivers/web/middleware/auth/check_permissions';

const controller = new SaleController();

const router = Router();

router.post(
    '/create-one',
    checkPermissions('sale:create'),
    controller.createOne
);
router.post(
    '/create-many',
    checkPermissions('sale:create'),
    controller.createMany
);
router.get(
    '/get-all',
    checkPermissions('sale:read'),
    controller.getAll
);
router.get(
    '/:id/get-one',
    checkPermissions('sale:read'),
    controller.getById
);
router.put(
    '/:id/update-one',
    checkPermissions('sale:update'),
    controller.updateOne
);
router.delete(
    '/:id/delete-one',
    checkPermissions('sale:delete'),
    controller.deleteOne
);
router.get(
    '/:time/get-report',
    checkPermissions('sale:read'),
    controller.dailyReport
);

export { router };
