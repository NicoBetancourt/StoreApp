import { Collection } from 'mongodb';
import { StorageError } from 'domain/modules/common/enterprise_business/dto/errors/storage_error';
import { clients } from '../../client/client';
import { IWrapper,IFilterWrapper } from 'frameworks_drivers/storage/client/interfaces/iwrapper';
import { BaseImplementation } from '../../client/driver/base_mongo_impl';
import { SaleDOM,ISaleFDOM } from 'domain/modules/sales/enterprise_business/entities/sale_dom';
import { SaleDAL,ISaleFDAL } from 'frameworks_drivers/storage/models/sale/sale_dal';
import { addTimeToSepecificDate, dateToDateTime, isoDateStringToDateTime, setIsoDate, Time } from 'frameworks_drivers/external_interface/datetime';
import { DateTime } from 'luxon';

const COLLECTION_NAME = 'sales';

export class SaleMongoImplementation
    extends BaseImplementation<SaleDOM, SaleDAL,ISaleFDOM,ISaleFDAL>
    implements
        IWrapper<SaleDOM, SaleDAL>,
        IFilterWrapper<ISaleFDOM, ISaleFDAL>
{
    private collection!: Collection;

    constructor(client_name: string) {
        super();
        const db = clients.get(client_name);
        if (db) this.collection = db.collection(COLLECTION_NAME);
    }

    async create(item: SaleDOM): Promise<SaleDOM> {
        try {
            const itemDAL = this.fromDomToDal(item);
            const resDAL = await this.insertOne(itemDAL, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async update(id: string, item: SaleDOM): Promise<SaleDOM | null> {
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
    async getAll(filter:ISaleFDAL): Promise<SaleDOM[]> {
        try {
            const resDAL = await this.findAll(
                this.filterDomToDal(filter),
                this.collection);
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async getOne(id: string): Promise<SaleDOM | null> {
        try {
            /**Genera problemas cuando no encuentra id, genera bien el error pero genera 
             * un resDAL null, y genera un error en fromDalToDOM 
             * ya que no encuentra los atributos */ //TODO
            const resDAL = await this.findOne(id, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }

    async createMany(item: SaleDOM[]): Promise<SaleDOM[]> {
        try {
            const itemsDAL = item.map(this.fromDomToDal);
            const resDAL = await this.insertMany(itemsDAL, this.collection);
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDalToDom(item: SaleDAL): SaleDOM {
        const dom = new SaleDOM({
            id: item._id,
            productId: item.product_id,
            userId: item.user_id,
            quantity: item.quantity,
            time: item.time,
        });
        return dom;
    }
    fromDomToDal(item: SaleDOM): SaleDAL {
        const dal = new SaleDAL({
            _id: item.id,
            product_id: item.productId,
            user_id: item.userId,
            quantity: item.quantity,
            time: item.time,
        });
        return dal;
    }

    filterDomToDal(item: any): ISaleFDAL {
        const mapFilter: ISaleFDAL = {
            time: null,
        };

        for (const key in item) {
            switch (key) {
                case 'product_id':
                    mapFilter[key] = item[key];
                    break;
                case 'user_id':
                    mapFilter[key] = item[key];
                    break;
                case 'quantity':
                    mapFilter[key] = item[key];
                    break;
                case 'time': //Acá se debe implementar bien este caso de usos //TODO
                    mapFilter[key] = {
                        $gte: dateToDateTime(setIsoDate(item[key])),
                        $lte: addTimeToSepecificDate(1, dateToDateTime(item[key]), Time.DAYS),
                    };

                    break;
            }
        }
        return mapFilter;
    }
}
            