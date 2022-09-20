class ListResponse<T = any> {
    items: T[];

    constructor(items: T[]) {
        this.items = items;
    }
}

export { ListResponse };
