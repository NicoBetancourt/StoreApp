import { makeRole } from "domain/modules/roles/enterprise_bussines/entities";
import { RoleDOM,IRoleFDOM } from "domain/modules/roles/enterprise_bussines/entities/role_dom";
import { IOperations } from "frameworks_drivers/storage/client/interfaces/ioperations";

type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM>;
};

const build = ({ roleRepo }: Dependencies) => {
    const execute = async (item: RoleDOM) => {
        const entity = makeRole(item, true);
        const result = await roleRepo.create(entity);
        return result;
    };
    return execute;
};

export { build };