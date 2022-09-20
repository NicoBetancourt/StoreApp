import { IMapperAPI } from "domain/modules/common/interface_adapters/web/imapperapi";
import { UserAPI } from "domain/modules/users/enterprise_business/dto/user_api";
import { UserDOM } from "domain/modules/users/enterprise_business/entities/user_dom";
import { fromCamelToSnake } from "frameworks_drivers/helpers.ts/from_camel_to_snake";

// Para mapper se deben asignar cada una de las variables 
export class UserMapper implements IMapperAPI <UserDOM, UserAPI>{
    fromApiToDom(item: UserAPI, opts?: any): UserDOM {
        const dom = new UserDOM({
            id: item.id,
            name: item.name,
            lastName: item.lastName,
            document: item.document,
            role: item.role,

        });
        return dom;
    }

    // ¿Para qué sirven los parámetros de opts?
    fromDomToApi(item: UserDOM, opts?: any) {
        const api = new UserAPI({
            id: item.id,
            name: item.name,
            lastName: item.lastName,
            document: item.document,
            role: item.role,

        });

        //¿Por qué usan para esta parte fromCamelToSnake?
        // if (item.products) {
        //     api.products = item.products.map((product) =>
        //         fromCamelToSnake(product)
        //     );
        // }

        return api;
    }
}

const mapper = new UserMapper();

export default mapper;
