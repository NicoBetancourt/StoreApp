import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { ErrorBadRequest } from 'domain/modules/common/enterprise_business/dto/errors/bad_request';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const ERROR_NOT_FOUND = 'Please verify user, not found';
const ERROR_NOT_UPDATE = 'Please verify user and changes';

const build = ({ productRepo }: Dependencies) => {
    const execute = async (
        id: string,
        item: ProductDOM,
    ) => {
        const user = await productRepo.getOne(id);
        if (!user) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);

        const updateUser = user.updateUser(item);
        const result = await productRepo.update(id, updateUser);
        if (!result) throw new ErrorBadRequest(ERROR_NOT_UPDATE);

        return result;
    };

    return execute;
};

export { build };
