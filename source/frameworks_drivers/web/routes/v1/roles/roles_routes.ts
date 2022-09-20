import { Router } from 'express';
import filter from 'frameworks_drivers/web/middleware/users/user_filter';
import  checkPermissions from 'frameworks_drivers/web/middleware/auth/check_permissions';
import { RoleController } from 'domain/modules/roles/interface_adapters/web/controllers/role_controller';

const controller = new RoleController();
const router = Router();

router.post(
    '/create-one',
    checkPermissions('role:create'),
    controller.createOne
);
router.get(
    '/get-all',
    checkPermissions('role:read'),
    filter,
    controller.getAll
);
router.get(
    '/:id/get-one',
    checkPermissions('role:read'),
    controller.getById
);
router.put(
    '/:id/update-one',
    checkPermissions('role:update'),
    controller.updateOne
);
router.put(
    '/:id/delete-one',
    checkPermissions('role:delete'),
    controller.deleteOne
);

export { router };
