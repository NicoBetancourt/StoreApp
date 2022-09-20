import { build as buildGetRoleList } from './use_cases/get_role_data';
import { build as buildCheckPermissions } from './use_cases/check_scopes';
import { build as buildGetAll } from './use_cases/get_all';
import { build as buildGetOne } from './use_cases/get_one';
import { build as buildCreateOne } from './use_cases/create_one';
import { build as buildUpdateOne } from './use_cases/update_one';
import { build as buildDeleteOne } from './use_cases/delete_one';

import { RoleRepository } from 'domain/modules/roles/interface_adapters/repositories/role_repo';
import { RoleMongoImplementation } from 'frameworks_drivers/storage/implementation/roles/role_imp';
import { UserMongoImplementation } from 'frameworks_drivers/storage/implementation/users/user_imp';
import { UserRepository } from 'domain/modules/users/interface_adapters/repositories/user_repo';
const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongo_client';

const roleRepo = new RoleRepository(new RoleMongoImplementation(MONGO_CLIENT));
const userRepo = new UserRepository(new UserMongoImplementation(MONGO_CLIENT));

const getRoleList = buildGetRoleList({ roleRepo });
const getAll = buildGetAll({ roleRepo });
const getOne = buildGetOne({ roleRepo });
const createOne = buildCreateOne({ roleRepo });
const updateOne = buildUpdateOne({ roleRepo });
const deleteOne = buildDeleteOne({ roleRepo });

const checkPermissions = buildCheckPermissions({roleRepo, userRepo});

const service = {
    getRoleList,
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    checkPermissions,
};
export default service;
export {
    getRoleList,
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    checkPermissions,
};
