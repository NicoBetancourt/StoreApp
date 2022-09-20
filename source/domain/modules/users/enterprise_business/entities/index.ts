import {build as buildeUser } from './user_dom';
import { idGen, validatorId }  from "frameworks_drivers/storage/client/driver/factory_id";
// ¿Por qué acá carga los idGen y en user_dom carga 

const makeUser = buildeUser({
    idGen,
    validatorId,
});

// No sé qué hace
const service = {
    makeUser,
};

export default service;
export { makeUser };
