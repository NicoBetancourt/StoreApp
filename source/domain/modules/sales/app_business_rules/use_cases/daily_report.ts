import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { ProductDOM, IProductFDOM } from 'domain/modules/products/enterprise_business/entities/product_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { SaleDOM, ISaleFDOM } from '../../enterprise_business/entities/sale_dom';

type Dependencies = {
    saleRepo: IOperations<SaleDOM,ISaleFDOM>;
    productRepo: IOperations<ProductDOM, IProductFDOM>;
};

const ERROR_NOT_FOUND = 'Please verify product, not found';

const build = ({ saleRepo, productRepo }: Dependencies) => {
    const execute = async (
            filter: ISaleFDOM
        ) => {
        const salesF = await saleRepo.getAll(filter);
        
        const sumary = []

        for (const saleF of salesF) {
            const produfctF = await productRepo.getOne(saleF.productId)
            if (!produfctF) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);
            const amount = produfctF.price * saleF.quantity
            sumary.push({ product_id: saleF.productId, quantity: saleF.quantity, totalAmount:amount})
        }

        return sumary;
    };

    return { execute };
};

export { build };
