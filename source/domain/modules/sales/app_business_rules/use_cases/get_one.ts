import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { SaleDOM, ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM, ISaleFDOM>;
};

const ERROR_NOT_FOUND = 'Please verify user, not found';

const build = ({ saleRepo }: Dependencies) => {
    const execute = async (id: any) => {
        const entity = await saleRepo.getOne(id);
        if (!entity) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);
        return entity;
    };

    return {
        execute,
    };
};

export { build };
