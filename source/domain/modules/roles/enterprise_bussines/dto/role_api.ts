export interface IRoleAPI {
    id: string;
    name: string;
    scopes: string[];
}

export class RoleAPI implements IRoleAPI {
    id: string;
    name: string;
    scopes: string[];

    constructor(item: IRoleAPI) {
        this.id = item.id;
        this.name = item.name;
        this.scopes = item.scopes;
    }
}
