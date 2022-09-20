import { RoleDOM,IRoleFDOM  } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';

type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM >;
};

const build = ({ roleRepo }: Dependencies) => {
    const execute = async () => {
        //**Get complete roles list, actions and scopes */
        const roleData: RoleDOM[] = await roleRepo.getAll({});

        return roleData;
    };

    return execute;
};

export { build };
