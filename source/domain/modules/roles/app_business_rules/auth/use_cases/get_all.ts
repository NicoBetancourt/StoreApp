import { RoleDOM,IRoleFDOM } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';

type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM>;
};

const build = ({ roleRepo }: Dependencies) => {
    const execute = async (
    ) => {
        const entity = await roleRepo.getAll({});
        return entity;
    };

    return { execute };
};

export { build };
