import { timeEnd } from "console";
import { getCurrentDate } from "frameworks_drivers/external_interface/datetime";

export interface ISaleDAL {
    _id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    time?: Date;
}

export interface ISaleFDAL {
    [index: string]: any;
    _id?: string;
    product_id?: string;
    user_id?: string;
    quantity?: number;
    // time?: Date;
};

export class SaleDAL implements ISaleDAL {
    _id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    time?: Date;

    constructor(item: ISaleDAL) {
        this._id = item._id;
        this.product_id = item.product_id;
        this.user_id = item.user_id;
        this.quantity = item.quantity;
        this.time = item?.time ? this.time: getCurrentDate() /// se debe agregar el tiempo acá o en el caso de uso de create? //TODO
    }
}
