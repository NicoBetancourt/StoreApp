import { build as buildGetAll } from './use_cases/get_all';
import { build as buildGetOne } from './use_cases/get_one';
import { build as buildCreateOne } from './use_cases/create_one';
import { build as buildUpdateOne } from './use_cases/update_one';
import { build as buildDeleteOne } from './use_cases/delete_one';
import { UserRepository } from '../interface_adapters/repositories/user_repo';
import { UserMongoImplementation } from 'frameworks_drivers/storage/implementation/users/user_imp';

const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongo_client';
const userRepo = new UserRepository(
    new UserMongoImplementation(MONGO_CLIENT)
);

const getAll = buildGetAll({ userRepo });
const getOne = buildGetOne({ userRepo });
const createOne = buildCreateOne({ userRepo });
const updateOne = buildUpdateOne({ userRepo });
const deleteOne = buildDeleteOne({ userRepo });

const service = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};
export default service;
export {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};
