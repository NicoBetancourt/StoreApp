import { IMapperAPI } from "domain/modules/common/interface_adapters/web/imapperapi";
import { RoleAPI } from "domain/modules/roles/enterprise_bussines/dto/role_api";
import { RoleDOM } from "domain/modules/roles/enterprise_bussines/entities/role_dom";

// Para mapper se deben asignar cada una de las variables 
export class RoleMapper implements IMapperAPI <RoleDOM, RoleAPI>{
    fromApiToDom(item: RoleAPI, opts?: any): RoleDOM {
        const dom = new RoleDOM({
            id: item.id,
            name: item.name,
            scopes: item.scopes,
        });
        return dom;
    }

    // ¿Para qué sirven los parámetros de opts?
    fromDomToApi(item: RoleDOM, opts?: any) {
        const api = new RoleAPI({
            id: item.id,
            name: item.name,
            scopes: item.scopes,
        });

        return api;
    }
}

const mapper = new RoleMapper();

export default mapper;
