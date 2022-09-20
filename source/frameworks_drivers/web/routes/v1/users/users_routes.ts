import { Router } from 'express';
import filter from 'frameworks_drivers/web/middleware/users/user_filter';
import  checkPermissions from 'frameworks_drivers/web/middleware/auth/check_permissions';
import { UserController } from 'domain/modules/users/interface_adapters/web/controllers/user_controller';

const controller = new UserController();

const router = Router();

router.post(
    '/create-one',
    checkPermissions('users:create'),
    controller.createOne
);
router.get(
    '/get-all',
    checkPermissions('users:read'),
    filter,
    controller.getAll
);
router.get(
    '/:id/get-one',
    checkPermissions('users:read'),
    controller.getById
);
router.put(
    '/:id/update-one',
    checkPermissions('users:update'),
    controller.updateOne
);
router.delete(
    '/:id/delete-one',
    checkPermissions('users:delete'),
    controller.deleteOne
);

export { router };
