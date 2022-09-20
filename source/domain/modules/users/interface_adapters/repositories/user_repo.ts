import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';

export class UserRepository implements IOperations <UserDOM,IUserFDOM > {
    private implementation: IOperations<UserDOM,IUserFDOM>;

    constructor(implementation: IOperations<UserDOM,IUserFDOM>) {
        this.implementation = implementation;
    }
    async create(item: UserDOM): Promise<UserDOM> {
        return await this.implementation.create(item);
    }
    async update(id: string, item: UserDOM): Promise<UserDOM | null> {
        return await this.implementation.update(id, item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.implementation.delete(id);
    }
    async getAll(filter: IUserFDOM): Promise<UserDOM[]> {
        return await this.implementation.getAll(filter);
    }
    async getOne(id: string): Promise<UserDOM | null> {
        return await this.implementation.getOne(id);
    }
    async createMany(item: UserDOM[]): Promise<UserDOM[]> {
        return await this.implementation.createMany(item);
    }
}