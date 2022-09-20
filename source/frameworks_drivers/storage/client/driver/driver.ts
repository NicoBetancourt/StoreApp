import { IMongoOperations } from '../interfaces/ioperations';
import { Collection } from 'mongodb';
import { StorageError } from 'domain/modules/common/enterprise_business/dto/errors/storage_error';

export abstract class MongoDriver<T, FDal>
    implements IMongoOperations<T, FDal>
{

    async insertMany(item: T[], collection: Collection<any>): Promise<T[]> {
        try {
            const result = await collection.insertMany(item);
            return <T[]>result.ops;
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async upsert(query: any, item: T, collection: Collection): Promise<T> {
        try {
            const result = await collection.replaceOne(query, item, {
                upsert: true,
            });
            return <T>result.ops[0];
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async insertOne(item: T, collection: Collection): Promise<T> {
        try {
            const result = await collection.insertOne(item); // Acá está fallando
            return <T>result.ops[0];
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async updateOne(
        id: string,
        item: T,
        collection: Collection
    ): Promise<T | null> {
        try {
            const result = await collection.findOneAndUpdate(
                { _id: id },
                { $set: item },
                { returnOriginal: false }
            );

            return result.value;
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async deleteOne(id: string, collection: Collection): Promise<boolean> {
        try {
            const result = await collection.findOneAndDelete({ _id: id });
            return !!result.ok;
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async findAll(
            filter:any, //antes estaba en FDal, lo cambié por any para que funcionara //TODO
            collection: Collection
        ): Promise<T[]> {
        try {
            const result = await collection.find(filter).toArray(); //Revisar porqué no funciona al agregar el filtro acá. //TODO
            return <T[]>result;
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

    async findOne(id: string, collection: Collection): Promise<T> {
        try {
            const result = await collection.findOne({ _id: id });
            return <T>result;
        } catch (error: any) {
            throw new StorageError(error.message);
        }
    }

}
