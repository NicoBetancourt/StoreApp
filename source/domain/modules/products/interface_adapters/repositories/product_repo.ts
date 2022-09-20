import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ProductDOM,IProductFDOM  } from './../../enterprise_business/entities/product_dom';

export class ProductRepository implements IOperations <ProductDOM,IProductFDOM  > {
    private implementation: IOperations<ProductDOM,IProductFDOM >;

    constructor(implementation: IOperations<ProductDOM,IProductFDOM >) {
        this.implementation = implementation;
    }
    async create(item: ProductDOM): Promise<ProductDOM> {
        return await this.implementation.create(item);
    }
    async update(id: string, item: ProductDOM): Promise<ProductDOM | null> {
        return await this.implementation.update(id, item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.implementation.delete(id);
    }
    async getAll(filter:IProductFDOM ): Promise<ProductDOM[]> {
        return await this.implementation.getAll(filter);
    }
    async getOne(id: string): Promise<ProductDOM | null> {
        return await this.implementation.getOne(id);
    }
    async createMany(item: ProductDOM[]): Promise<ProductDOM[]> {
        return await this.implementation.createMany(item);
    }
}