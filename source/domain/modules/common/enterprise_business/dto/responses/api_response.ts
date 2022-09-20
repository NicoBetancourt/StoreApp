class ApiResponse<T = any> {
    status: number;
    result: T | T[]; //¿Esto se pyede hacer?

    constructor(status: number, result: T) {
        this.result = result;
        this.status = status || 200;
    }
}

export { ApiResponse };