import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const build = ({
    productRepo,
}: Dependencies) => {
    const execute = async (id: string) => {
        const result = await productRepo.delete(id);
        if (!result) throw new Error('Please verify role and changes');

        return result;
    };
    return execute;
};

export { build };
