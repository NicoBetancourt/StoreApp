
export interface IUserDAL {
    _id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;
}

export interface IUserFDAL {
    _id?: string;
    name?: string;
    lastName?: string;
    document?: number;
    role?: string;
}

export class UserDAL implements IUserDAL {
    _id: string;
    name: string;
    lastName: string;
    document: number;
    role: string;

    constructor(item: IUserDAL) {
        this._id = item._id;
        this.name = item.name;
        this.lastName = item.lastName;
        this.document = item.document;
        this.role = item.role;
    }
}
