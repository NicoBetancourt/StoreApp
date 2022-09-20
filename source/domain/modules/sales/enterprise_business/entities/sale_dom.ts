import { idGenFn, validatorIdFn }  from "frameworks_drivers/storage/client/driver/factory_id";

export interface ISaleDOM {
    id: string;
    productId: string;
    userId: string;
    quantity: number;
    time?: Date;
};

export interface ISaleFDOM {
    id?: string;
    productId?: string;
    userId?: string;
    quantity?: number;
    time?: Date;
};


export class SaleDOM implements ISaleDOM{
    id: string;
    productId: string;
    userId: string;
    quantity: number;
    time?: Date;

    constructor(item: ISaleDOM) {
        this.id = item.id;
        this.productId = item.productId;
        this.userId = item.userId;
        this.quantity = item.quantity;
        this.time = item?.time;
    };

    updateUser (item: SaleDOM) {
        this.id = item?.id ? item.id :this.id;
        this.productId = item?.productId ? item.productId :this.productId;
        this.userId = item?.userId ? item.userId :this.userId;
        this.quantity = item?.quantity ? item.quantity :this.quantity;
        this.time = item?.time ? item.time :this.time;
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
    const execute = (item: ISaleDOM, create = false ) => {
        const entity = new SaleDOM(validateData(item, create));
        return Object.freeze(entity);
    };

    const validateData = (item:ISaleDOM, create: boolean) => {
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