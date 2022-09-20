import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { RoleDOM,IRoleFDOM } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';
type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM>;
};

const build = ({
    roleRepo,
}: Dependencies) => {
    const execute = async (id: string) => {
        const result = await roleRepo.delete(id);
        if (!result) throw new Error('Please verify Role and changes');

        return result;
    };
    return execute;
};

export { build };
