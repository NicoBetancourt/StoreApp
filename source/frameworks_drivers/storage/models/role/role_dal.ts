
export interface IRoleDAL {
    _id: string;
    name: string;
    scopes: string[];
}

export interface IRoleFDAL {
    _id?: string;
    name?: string;
    scopes?: string[];
}

export class RoleDAL implements IRoleDAL {
    [index: string]: any;
    _id: string;
    name: string;
    scopes: string[];

    constructor(item: IRoleDAL) {
        this._id = item._id;
        this.name = item.name;
        this.scopes = item.scopes;
    }
}
