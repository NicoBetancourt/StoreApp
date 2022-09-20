import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const build = ({ productRepo }: Dependencies) => {
    const execute = async () => {
        const entity = await productRepo.getAll({});
        return entity;
    };

    return { execute };
};

export { build };
