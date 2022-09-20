import { idGenFn, validatorIdFn }  from "frameworks_drivers/storage/client/driver/factory_id";

export interface IProductDOM {
    id: string;
    name: string;
    description: string;
    price: number;
};

export interface IProductFDOM {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
};


export class ProductDOM implements IProductDOM{
    id: string;
    name: string;
    description: string;
    price: number;

    constructor(item: IProductDOM) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.price = item.price;
    }
;

    updateUser (item: ProductDOM) {
        this.id = item?.id ? item.id :this.id;
        this.name = item?.name ? item.name :this.name;
        this.description = item?.description ? item.description :this.description;
        this.price = item?.price ? item.price :this.price;
        return Object.freeze(this)
    };

    deleteUser() { 
        return Object.freeze(this);// Por qué freeze this?
    };
};

type Dependencies = {
    idGen: idGenFn;
    validatorId: validatorIdFn;
};

const build = ({idGen,  validatorId}: Dependencies) => {
    const execute = (item: IProductDOM, create = false ) => {
        const entity = new ProductDOM(validateData(item, create));
        return Object.freeze(entity);
    };

    const validateData = (item:IProductDOM, create: boolean) => {
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