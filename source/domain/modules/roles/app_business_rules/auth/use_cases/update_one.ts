// import { UserDOM,IUserDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { ErrorBadRequest } from 'domain/modules/common/enterprise_business/dto/errors/bad_request';
import { RoleDOM,IRoleFDOM  } from 'domain/modules/roles/enterprise_bussines/entities/role_dom';

type Dependencies = {
    roleRepo: IOperations<RoleDOM,IRoleFDOM >;
};

const ERROR_NOT_FOUND = 'Please verify role, not found';
const ERROR_NOT_UPDATE = 'Please verify role and changes';

const build = ({ roleRepo }: Dependencies) => {
    const execute = async (
        id: string,
        item: RoleDOM,
    ) => {
        const role = await roleRepo.getOne(id);
        if (!role) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);

        const updateRole = role.updateRole(item);
        const result = await roleRepo.update(id, updateRole);
        if (!result) throw new ErrorBadRequest(ERROR_NOT_UPDATE);

        return result;
    };

    return execute;
};

export { build };
