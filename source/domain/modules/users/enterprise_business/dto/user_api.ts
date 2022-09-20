// import { IRoleDOM } from '@products/enterprise_business/entities/product/product_dom';
// ¿Por qué se crea UserAPI?
export interface IUserAPI {
    id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;
};

export class UserAPI implements IUserAPI{
    id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;

    constructor(item: IUserAPI) {
        this.id = item.id;
        this.name = item.name;
        this.lastName = item.lastName;
        this.document = item.document;
        this.role = item.role;
    };
};
