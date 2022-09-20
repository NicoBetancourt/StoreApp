export interface ISaleAPI {
    id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    time?: Date;
};

export class SaleAPI implements ISaleAPI{
    id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    time?: Date;

    constructor(item: SaleAPI) {
        this.id = item.id;
        this.product_id = item.product_id;
        this.user_id = item.user_id;
        this.quantity = item.quantity;
        this.time = item?.time;
    };
};
