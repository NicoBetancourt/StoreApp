import { Collection } from 'mongodb';
import { IUserFDOM, UserDOM } from 'domain/modules/users/enterprise_business/entities/user_dom';
import { StorageError } from 'domain/modules/common/enterprise_business/dto/errors/storage_error';
import { clients } from '../../client/client';
import { IWrapper,IFilterWrapper } from 'frameworks_drivers/storage/client/interfaces/iwrapper';
import { BaseImplementation } from '../../client/driver/base_mongo_impl';
import { UserDAL,IUserFDAL } from 'frameworks_drivers/storage/models/user/user_dal';

const COLLECTION_NAME = 'users';

export class UserMongoImplementation
    extends BaseImplementation<UserDOM, UserDAL,IUserFDOM,IUserFDAL>
    implements
        IWrapper<UserDOM, UserDAL>,
        IFilterWrapper<IUserFDOM, IUserFDAL>
{
    private collection!: Collection;

    constructor(client_name: string) {
        super();
        const db = clients.get(client_name);
        if (db) this.collection = db.collection(COLLECTION_NAME);
    }

    async create(item: UserDOM): Promise<UserDOM> {
        try {
            const itemDAL = this.fromDomToDal(item);
            const resDAL = await this.insertOne(itemDAL, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async update(id: string, item: UserDOM): Promise<UserDOM | null> {
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
    async getAll(filter:IUserFDAL): Promise<UserDOM[]> {
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
    async getOne(id: string): Promise<UserDOM | null> {
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

    async createMany(item: UserDOM[]): Promise<UserDOM[]> {
        try {
            const itemsDAL = item.map(this.fromDomToDal);
            const resDAL = await this.insertMany(itemsDAL, this.collection);
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDalToDom(item: UserDAL): UserDOM {
        const dom = new UserDOM({
            id: item._id,
            name: item.name,
            lastName: item.lastName,
            document: item.document,
            role: item.role,
        });
        return dom;
    }
    fromDomToDal(item: UserDOM): UserDAL {
        const dal = new UserDAL({
            _id: item.id,
            name: item.name,
            lastName: item.lastName,
            document: item.document,
            role: item.role,
        });
        return dal;
    }

    filterDomToDal(item: any): IUserFDAL {
        const mapFilter: IUserFDAL = {
            // time: },
        };

        for (const key in item) {
            switch (key) {
                case 'name':
                    mapFilter[key] = item[key];
                    break;
                    case 'lastName':
                        mapFilter[key] = item[key];
                        break;
                    case 'document':
                        mapFilter[key] = item[key];
                        break;
                    case 'role':
                        mapFilter[key] = item[key];
                        break;
            }
        }
        return mapFilter;
    }

}
