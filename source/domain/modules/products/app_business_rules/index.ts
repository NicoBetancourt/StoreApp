import { build as buildGetAll } from './use_cases/get_all';
import { build as buildGetOne } from './use_cases/get_one';
import { build as buildCreateOne } from './use_cases/create_one';
import { build as buildCreateMany } from './use_cases/create_many';
import { build as buildUpdateOne } from './use_cases/update_one';
import { build as buildDeleteOne } from './use_cases/delete_one';
import { PruductMongoImplementation } from 'frameworks_drivers/storage/implementation/products/product_imp';
import { ProductRepository } from '../interface_adapters/repositories/product_repo';

const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongo_client';
const productRepo = new ProductRepository(
    new PruductMongoImplementation(MONGO_CLIENT)
);

const getAll = buildGetAll({ productRepo });
const getOne = buildGetOne({ productRepo });
const createOne = buildCreateOne({ productRepo });
const createMany = buildCreateMany({ productRepo });
const updateOne = buildUpdateOne({ productRepo });
const deleteOne = buildDeleteOne({ productRepo });

const service = {
    getAll,
    getOne,
    createOne,
    createMany,
    updateOne,
    deleteOne,
};
export default service;
export {
    getAll,
    getOne,
    createOne,
    createMany,
    updateOne,
    deleteOne,
};
