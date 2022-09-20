import {build as buildProduct } from './product_dom';
import { idGen, validatorId }  from "frameworks_drivers/storage/client/driver/factory_id";
// ¿Por qué acá carga los idGen y en user_dom carga 

const makeProduct = buildProduct({
    idGen,
    validatorId,
});

// No sé qué hace
const service = {
    makeProduct,
};

export default service;
export { makeProduct };
