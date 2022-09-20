// ¿Por qué se crea UserAPI?
export interface IProductAPI {
    id: string;
    name: string;
    description: string;
    price: number;
};

export class ProductAPI implements IProductAPI{
    id: string;
    name: string;
    description: string;
    price: number;

    constructor(item: IProductAPI) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.price = item.price;
    };
};
