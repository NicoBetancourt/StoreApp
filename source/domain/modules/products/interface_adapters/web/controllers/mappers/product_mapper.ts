import { IMapperAPI } from "domain/modules/common/interface_adapters/web/imapperapi";
import { ProductAPI } from "domain/modules/products/enterprise_business/dto/product_api";
import { ProductDOM } from "domain/modules/products/enterprise_business/entities/product_dom";

// Para mapper se deben asignar cada una de las variables 
export class ProductMapper implements IMapperAPI <ProductDOM, ProductAPI>{
    fromApiToDom(item: ProductAPI, opts?: any): ProductDOM {
        const dom = new ProductDOM({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
        });
        return dom;
    }

    // ¿Para qué sirven los parámetros de opts?
    fromDomToApi(item: ProductDOM, opts?: any) {
        const api = new ProductAPI({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
        });
        
        return api;
    }
}

const mapper = new ProductMapper();

export default mapper;
