import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { makeSale } from '../../enterprise_business/entities';
import { SaleDOM, ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM, ISaleFDOM>;
};

const build = ({ saleRepo }: Dependencies) => {
    const execute = async (item: SaleDOM[] ) => {
        const salesDOMS = await mapItems(item);
        const result = await saleRepo.createMany(salesDOMS);
        return result;
    };

    const mapItems = async (items: any[]) => {
        const itemsDOM: SaleDOM[] = [];
        for (const item of items) {
            const entity = makeSale({
                id: '',
                productId: item.productId,
                userId: item.userId,
                quantity: item.quantity,
                time: item.time,
            });
            itemsDOM.push(entity);
        }
        return itemsDOM;
    };

    return execute;
};

export { build };