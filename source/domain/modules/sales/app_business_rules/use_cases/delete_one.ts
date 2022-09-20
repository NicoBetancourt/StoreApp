import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { SaleDOM,ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM,ISaleFDOM>;
};

const build = ({
    saleRepo,
}: Dependencies) => {
    const execute = async (id: string) => {
        const result = await saleRepo.delete(id);
        if (!result) throw new Error('Please verify role and changes');

        return result;
    };
    return execute;
};

export { build };
