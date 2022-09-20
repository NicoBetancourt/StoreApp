import {build as buildSale } from './sale_dom';
import { idGen, validatorId }  from "frameworks_drivers/storage/client/driver/factory_id";
// ¿Por qué acá carga los idGen y en user_dom carga 

const makeSale = buildSale({
    idGen,
    validatorId,
});

// No sé qué hace
const service = {
    makeSale,
};

export default service;
export { makeSale };
