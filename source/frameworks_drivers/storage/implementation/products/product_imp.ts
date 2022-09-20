import { Collection } from 'mongodb';
import { StorageError } from 'domain/modules/common/enterprise_business/dto/errors/storage_error';
import { clients } from '../../client/client';
import { IWrapper, IFilterWrapper} from 'frameworks_drivers/storage/client/interfaces/iwrapper';
import { BaseImplementation } from '../../client/driver/base_mongo_impl';
import { IProductFDOM, ProductDOM } from 'domain/modules/products/enterprise_business/entities/product_dom';
import { IProductFDAL, ProductDAL } from 'frameworks_drivers/storage/models/product/product_dal';
import { camelToSnake } from 'frameworks_drivers/helpers.ts/from_camel_to_snake';

const COLLECTION_NAME = 'products';

export class PruductMongoImplementation
    extends BaseImplementation<ProductDOM, ProductDAL, IProductFDOM, IProductFDAL>
    implements
        IWrapper<ProductDOM, ProductDAL>,
        IFilterWrapper<IProductFDOM, IProductFDAL>
{
    private collection!: Collection;

    constructor(client_name: string) {
        super();
        const db = clients.get(client_name);
        if (db) this.collection = db.collection(COLLECTION_NAME);
    }

    async create(item: ProductDOM): Promise<ProductDOM> {
        try {
            const itemDAL = this.fromDomToDal(item);
            const resDAL = await this.insertOne(itemDAL, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async update(id: string, item: ProductDOM): Promise<ProductDOM | null> {
        try {
            const resDAL = await this.updateOne(
                id,
                this.fromDomToDal(item),
                this.collection
            );
            const resDOM = resDAL !== null ? this.fromDalToDom(resDAL) : null;
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            const res = await this.deleteOne(id, this.collection);
            return res;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async getAll(filter:IProductFDAL): Promise<ProductDOM[]> {
        try {
            const resDAL = await this.findAll(
                this.filterDomToDal(filter),
                this.collection
            );
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async getOne(id: string): Promise<ProductDOM | null> {
        try {
            /**Genera problemas cuando no encuentra id, genera bien el error pero genera 
             * un resDAL null, y genera un error en fromDalToDOM 
             * ya que no encuentra los atributos */
            const resDAL = await this.findOne(id, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }

    async createMany(item: ProductDOM[]): Promise<ProductDOM[]> {
        try {
            const itemsDAL = item.map(this.fromDomToDal);
            const resDAL = await this.insertMany(itemsDAL, this.collection);
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDalToDom(item: ProductDAL): ProductDOM {
        const dom = new ProductDOM({
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
        });
        return dom;
    }
    fromDomToDal(item: ProductDOM): ProductDAL {
        const dal = new ProductDAL({
            _id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
        });
        return dal;
    }

    filterDomToDal(item: any): IProductFDAL {
        const mapFilter: IProductFDAL = {
            // time: },
        };

        for (const key in item) {
            switch (key) {
                case 'name':
                    mapFilter[key] = item[key];
                    break;
                case 'description':
                    mapFilter[key] = item[key];
                    break;
                case 'price':
                    mapFilter[key] = item[key];
                    break;
            }
        }
        return mapFilter;
    }

}
