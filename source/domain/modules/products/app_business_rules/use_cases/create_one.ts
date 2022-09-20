import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { makeProduct } from '../../enterprise_business/entities';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const build = ({ productRepo }: Dependencies) => {
    const execute = async (item: ProductDOM ) => {
        const entity = makeProduct(item, true);
        const result = await productRepo.create(entity);
        return result;
    };
    return execute;
};

export { build };
