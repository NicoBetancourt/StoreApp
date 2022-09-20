import { getCurrentDateFn } from './../../../../../frameworks_drivers/external_interface/datetime';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { makeSale } from '../../enterprise_business/entities';
import { SaleDOM,ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM,ISaleFDOM>,
    getCurrentDateNow: getCurrentDateFn
};

const build = ({ saleRepo , getCurrentDateNow}: Dependencies) => {
    const execute = async (item: SaleDOM ) => {
        const entity = makeSale(item, true);
        const result = await saleRepo.create(entity);
        if (!result.time) result.time = getCurrentDateNow() //new Date(Date.now()) // Definir default itme? //TODO
        return result;
    };
    return execute;
};

export { build };
