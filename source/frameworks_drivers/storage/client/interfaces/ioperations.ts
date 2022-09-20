import { Collection } from 'mongodb';

export interface IMongoOperations<T,FDal> {
    //Writing
    insertOne(item: T, collection: Collection): Promise<T>;
    updateOne(id: string, item: T, collection: Collection): Promise<T | null>;
    deleteOne(id: string, collection: Collection): Promise<boolean>;
    //Reading
    findAll(filter: FDal,collection: Collection): Promise<T[]>;
    findOne(id: string, collection: Collection): Promise<T | null>;
}

// export interface IMongoBulkOperations<T> {
//     upsert(query: any, item: T, collection: Collection): Promise<T>; // No sé qué hace (Actualizar)
//     insertMany(item: T[], collection: Collection): Promise<T[]>;
// }

export interface IOperations<T, FDom> {
    //Writing
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    //Reading
    getAll(filter: FDom,): Promise<T[]>;
    getOne(id: string): Promise<T | null>;
    //Bulk operations
    createMany(item: T[]): Promise<T[]>;
}