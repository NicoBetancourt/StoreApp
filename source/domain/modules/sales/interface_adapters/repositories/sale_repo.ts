import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { SaleDOM, ISaleFDOM } from './../../enterprise_business/entities/sale_dom';

export class SaleRepository implements IOperations <SaleDOM,ISaleFDOM > {
    private implementation: IOperations<SaleDOM,ISaleFDOM>;

    constructor(implementation: IOperations<SaleDOM, ISaleFDOM>) {
        this.implementation = implementation;
    }
    async create(item: SaleDOM): Promise<SaleDOM> {
        return await this.implementation.create(item);
    }
    async update(id: string, item: SaleDOM): Promise<SaleDOM | null> {
        return await this.implementation.update(id, item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.implementation.delete(id);
    }
    async getAll(filter: ISaleFDOM): Promise<SaleDOM[]> {
        return await this.implementation.getAll(filter);
    }
    async getOne(id: string): Promise<SaleDOM | null> {
        return await this.implementation.getOne(id);
    }
    async createMany(item: SaleDOM[]): Promise<SaleDOM[]> {
        return await this.implementation.createMany(item);
    }
}