import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const ERROR_NOT_FOUND = 'Please verify user, not found';

const build = ({ productRepo }: Dependencies) => {
    const execute = async (id: any) => {
        const entity = await productRepo.getOne(id);
        if (!entity) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);
        return entity;
    };

    return {
        execute,
    };
};

export { build };
