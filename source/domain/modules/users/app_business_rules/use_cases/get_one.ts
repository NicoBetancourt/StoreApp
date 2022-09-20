import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';

type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
};

const ERROR_NOT_FOUND = 'Please verify user, not found';

const build = ({ userRepo }: Dependencies) => {
    const execute = async (id: any) => {
        const entity = await userRepo.getOne(id);
        if (!entity) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);
        return entity;
    };

    return {
        execute,
    };
};

export { build };
