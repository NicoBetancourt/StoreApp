import { Collection, Db } from 'mongodb';
import { StorageError } from 'domain/modules/common/enterprise_business/dto/errors/storage_error';
import { clients } from '../../client/client';
import { IWrapper,IFilterWrapper } from 'frameworks_drivers/storage/client/interfaces/iwrapper';
import { BaseImplementation } from '../../client/driver/base_mongo_impl';
import { RoleDOM,IRoleFDOM } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';
import { RoleDAL,IRoleFDAL } from 'frameworks_drivers/storage/models/role/role_dal';
import { camelToSnake } from 'frameworks_drivers/helpers.ts/from_camel_to_snake';

const COLLECTION_NAME = 'roles';

// Requiere construir todos los métodos según BaseImplementation
export class RoleMongoImplementation
    extends BaseImplementation<RoleDOM, RoleDAL, IRoleFDOM,IRoleFDAL>
    implements
        IWrapper<RoleDOM, RoleDAL>,
        IFilterWrapper<IRoleFDOM, IRoleFDAL>

{
    private collection!: Collection;
    public view!: Collection;    

    constructor(client_name: string) {
        super();
        const db = clients.get(client_name); 
        if (db) this.collection = db.collection(COLLECTION_NAME);
    }

    async create(item: RoleDOM): Promise<RoleDOM> {
        try {
            const itemDAL = this.fromDomToDal(item);
            const resDAL = await this.insertOne(itemDAL, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }
    async update(id: string, item: RoleDOM): Promise<RoleDOM | null> {
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
    async getAll(filter:IRoleFDAL): Promise<RoleDOM[]> {
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
    async getOne(id: string): Promise<RoleDOM | null> {
        try {
            const resDAL = await this.findOne(id, this.collection);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error);
        }
    }

    async createMany(item: RoleDOM[]): Promise<RoleDOM[]> {
        try {
            const itemsDAL = item.map(this.fromDomToDal);
            const resDAL = await this.insertMany(itemsDAL, this.collection);
            const resDOM = resDAL.map(this.fromDalToDom);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDalToDom(item: RoleDAL): RoleDOM {
        const dom = new RoleDOM({
            id: item._id,
            name: item.name,
            scopes: item.scopes,

        });
        return dom;
    }
    fromDomToDal(item: RoleDOM): RoleDAL {
        const dal = new RoleDAL({
            _id: item.id,
            name: item.name,
            scopes: item.scopes,
        });
        return dal;
    }

    filterDomToDal(item: any): IRoleFDAL {
        const mapFilter: IRoleFDAL = {
            // time: },
        };

        for (const key in item) {
            switch (key) {
                case 'name':
                    mapFilter[key] = item[key];
                    break;
                case 'scopes':
                    mapFilter[key] = item[key];
                    break;
            }
        }
        return mapFilter;
    }
}
