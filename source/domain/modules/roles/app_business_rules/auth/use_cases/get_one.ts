import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { RoleDOM,IRoleFDOM  } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';

type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM >;
};

const ERROR_NOT_FOUND = 'Please verify Role, not found';

const build = ({ roleRepo }: Dependencies) => {
    const execute = async (id: any) => {
        
        const entity = await roleRepo.getOne(id);
        if (!entity) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);

        return entity;
    };

    return { execute };
};

export { build };
