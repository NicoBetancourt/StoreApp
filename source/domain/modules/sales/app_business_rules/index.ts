import { build as buildGetAll } from './use_cases/get_all';
import { build as buildGetOne } from './use_cases/get_one';
import { build as buildCreateOne } from './use_cases/create_one';
import { build as buildCreateMany } from './use_cases/create_many';
import { build as buildUpdateOne } from './use_cases/update_one';
import { build as buildDeleteOne } from './use_cases/delete_one';
import { build as buildDailyReport } from './use_cases/daily_report';
import { SaleMongoImplementation } from 'frameworks_drivers/storage/implementation/sales/sale_imp';
import { SaleRepository } from '../interface_adapters/repositories/sale_repo';
import { getCurrentDate } from 'frameworks_drivers/external_interface/datetime';
import { PruductMongoImplementation } from 'frameworks_drivers/storage/implementation/products/product_imp';
import { ProductRepository } from 'domain/modules/products/interface_adapters/repositories/product_repo';

const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongo_client';
const saleRepo = new SaleRepository(
    new SaleMongoImplementation(MONGO_CLIENT)
);

const productRepo = new ProductRepository(
    new PruductMongoImplementation(MONGO_CLIENT)
);

const getAll = buildGetAll({ saleRepo });
const getOne = buildGetOne({ saleRepo });
const createOne = buildCreateOne({ saleRepo, getCurrentDateNow: getCurrentDate });
const createMany = buildCreateMany({ saleRepo });
const updateOne = buildUpdateOne({ saleRepo });
const deleteOne = buildDeleteOne({ saleRepo });
const dailyReport = buildDailyReport({ saleRepo, productRepo});

const service = {
    getAll,
    getOne,
    createOne,
    createMany,
    updateOne,
    deleteOne,
    dailyReport,
};
export default service;
// export {
//     getAll,
//     getOne,
//     createOne,
//     createMany,
//     updateOne,
//     deleteOne,
//     dailyReport,
// };
