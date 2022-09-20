import { IMapperAPI } from "domain/modules/common/interface_adapters/web/imapperapi";
import { SaleAPI } from "domain/modules/sales/enterprise_business/dto/sale_api";
import { SaleDOM } from "domain/modules/sales/enterprise_business/entities/sale_dom";

// Para mapper se deben asignar cada una de las variables 
export class SaleMapper implements IMapperAPI <SaleDOM, SaleAPI>{
    fromApiToDom(item: SaleAPI, opts?: any): SaleDOM {
        const dom = new SaleDOM({
            id: item.id,
            productId: item.product_id,
            userId: item.user_id,
            quantity: item.quantity,
            time: item.time,
        });
        return dom;
    }

    // ¿Para qué sirven los parámetros de opts?
    fromDomToApi(item: SaleDOM, opts?: any) {
        const api = new SaleAPI({
            id: item.id,
            product_id: item.productId,
            user_id: item.userId,
            quantity: item.quantity,
            time: item.time,
        });
        
        return api;
    }
}

const mapper = new SaleMapper();

export default mapper;
