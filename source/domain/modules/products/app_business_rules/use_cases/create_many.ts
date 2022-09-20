import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { makeProduct } from '../../enterprise_business/entities';
import { ProductDOM,IProductFDOM  } from '../../enterprise_business/entities/product_dom';

type Dependencies = {
    productRepo: IOperations<ProductDOM,IProductFDOM >;
};

const build = ({ productRepo }: Dependencies) => {
    const execute = async (item: ProductDOM[] ) => {
        const productsDOMS = await mapProducts(item);
        const result = await productRepo.createMany(productsDOMS);
        return result;
    };

    const mapProducts = async (products: any[]) => {
        const productsDOM: ProductDOM[] = [];
        for (const product of products) {
            const entity = makeProduct({
                id: '',
                name: product.name,
                description: product.description,
                price: product.price,
            });
            productsDOM.push(entity);
        }
        return productsDOM;
    };

    return execute;
};

export { build };