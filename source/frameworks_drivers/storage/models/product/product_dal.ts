
export interface IProductDAL {
    _id: string;
    name: string;
    description: string;
    price: number;
}

export interface IProductFDAL {
    // [index: string]: any;
    _id?: string;
    name?: string;
    description?: string;
    price?: number;
}

export class ProductDAL implements IProductDAL {
    _id: string;
    name: string;
    description: string;
    price: number;

    constructor(item: IProductDAL) {
        this._id = item._id;
        this.name = item.name;
        this.description = item.description;
        this.price = item.price;
    }
}
