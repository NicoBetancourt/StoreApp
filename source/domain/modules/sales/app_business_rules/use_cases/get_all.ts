import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { SaleDOM, ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM, ISaleFDOM>;
};

const build = ({ saleRepo }: Dependencies) => {
    const execute = async (
        filter: ISaleFDOM
    ) => {
        const entity = await saleRepo.getAll(filter);
        return entity;
    };

    return { execute };
};

export { build };
