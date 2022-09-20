import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { RoleDOM,IRoleFDOM  } from '../../enterprise_bussines/entities/role_dom';

export class RoleRepository implements IOperations <RoleDOM,IRoleFDOM > {
    private implementation: IOperations<RoleDOM,IRoleFDOM >;

    constructor(implementation: IOperations<RoleDOM,IRoleFDOM> ) {
        this.implementation = implementation;
    }
    async create(item: RoleDOM): Promise<RoleDOM> {
        return await this.implementation.create(item);
    }
    async update(id: string, item: RoleDOM): Promise<RoleDOM | null> {
        return await this.implementation.update(id, item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.implementation.delete(id);
    }
    async getAll(filter:IRoleFDOM ): Promise<RoleDOM[]> {
        return await this.implementation.getAll(filter);
    }
    async getOne(id: string): Promise<RoleDOM | null> {
        return await this.implementation.getOne(id);
    }

    async createMany(item: RoleDOM[]): Promise<RoleDOM[]> {
        return await this.implementation.createMany(item);
    }
}