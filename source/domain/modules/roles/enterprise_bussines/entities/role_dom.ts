import { ErrorBadRequest } from 'domain/modules/common/enterprise_business/dto/errors/bad_request';
import { idGenFn, validatorIdFn } from 'frameworks_drivers/storage/client/driver/factory_id';

export interface IRoleDOM {
    id: string;
    name: string;
    scopes: any[];
}
export interface IRoleFDOM {
    id?: string;
    name?: string;
    scopes?: any[];
}

export class RoleDOM implements IRoleDOM { 
    id: string;
    name: string;
    scopes: any[];

    constructor(item: IRoleDOM) {
        this.id = item.id;
        this.name = item.name;
        this.scopes = item.scopes;
    }

    updateRole(item: RoleDOM) {
        this.id = item?.id ? item.id :this.id;
        this.name = item?.name ? item.name :this.name;
        this.scopes = item?.scopes ? item.scopes :this.scopes;
        return Object.freeze(this);
    }

    deleteRole() {
        return Object.freeze(this);
    }

}

type Dependencies = {
    idGen: idGenFn;
    validatorId: validatorIdFn;
};

const build = ({ idGen, validatorId }: Dependencies) => {
    const execute = (item: IRoleDOM, create = false) => {
        const entity = new RoleDOM(validateData(item, create));
        return Object.freeze(entity);
    };

    const validateData = (item: IRoleDOM, create: boolean) => {
        if (!item.id) item.id = idGen();
        else validateId(item.id, 'id');

        return item;
    };

    const validateId = (id: any, resource: string): any => {
        if (!validatorId(id))
            throw new ErrorBadRequest(`${resource} not valid`);
    };

    return execute;
};

export { build };
