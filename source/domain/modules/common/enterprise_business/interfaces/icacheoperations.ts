export interface ICacheOperations<T, TOptions = any> {
    getAll(opts: any, options?: TOptions): Promise<T[]>;
    getOne(key: string, options?: TOptions): Promise<T | null>;
    createOne(key: string, item: T, options?: TOptions): Promise<T>;
    deleteOne(key: string, options?: TOptions): Promise<boolean>;
}
