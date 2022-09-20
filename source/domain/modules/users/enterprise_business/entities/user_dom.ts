import { idGenFn, validatorIdFn }  from "frameworks_drivers/storage/client/driver/factory_id";


export interface IUserDOM {
    id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;
};

export interface IUserFDOM {
    id?: string;
    name?: string;
    lastName?: string;
    document?: number;
    role?: string;
};

export class UserDOM implements IUserDOM{
    id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;


    constructor(item: IUserDOM) {
        this.id = item.id;
        this.name = item.name;
        this.lastName = item.lastName;
        this.document = item.document;
        this.role = item.role;
    }
;

    updateUser (item: UserDOM) {
        this.id = item?.id ? item.id :this.id;
        this.name = item?.name ? item.name :this.name;
        this.lastName = item?.lastName ? item.lastName :this.lastName;
        this.document = item?.document ? item.document :this.document;
        this.role = item?.role ? item.role :this.role;
        return Object.freeze(this)
    };

    deleteUser() { 
        console.log('user dom');
        return Object.freeze(this);// Por qué freeze this?
    };
};

type Dependencies = {
    idGen: idGenFn;
    validatorId: validatorIdFn;
};

const build = ({idGen,  validatorId}: Dependencies) => {
    const execute = (item: IUserDOM, create = false ) => {
        const entity = new UserDOM(validateData(item, create));
        return Object.freeze(entity);
    };

    const validateData = (item:IUserDOM, create: boolean) => {
        if (!item.id) item.id = idGen();
        else validateId(item.id,'id');

        return item
    };

    const validateId = (id:any, resource: string): any =>{
        if (validatorId(id))
            throw new Error(`${resource} not valid`);    
    }

    return execute
};

export { build };