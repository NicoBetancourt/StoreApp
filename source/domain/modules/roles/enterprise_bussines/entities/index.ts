import { idGen, validatorId } from 'frameworks_drivers/storage/client/driver/factory_id';
import { build as buildMakeRole } from './role_dom';

const makeRole = buildMakeRole({
    idGen,
    validatorId,
});

const service = {
    makeRole,
};

export default service;
export { makeRole };