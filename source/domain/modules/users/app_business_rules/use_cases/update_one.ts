import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { ErrorResourceNotFound } from 'domain/modules/common/enterprise_business/dto/errors/resource_not_found';
import { ErrorBadRequest } from 'domain/modules/common/enterprise_business/dto/errors/bad_request';

type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
};

const ERROR_NOT_FOUND = 'Please verify user, not found';
const ERROR_NOT_UPDATE = 'Please verify user and changes';

const build = ({ userRepo }: Dependencies) => {
    const execute = async (
        id: string,
        item: UserDOM,
    ) => {
        const user = await userRepo.getOne(id);
        if (!user) throw new ErrorResourceNotFound(ERROR_NOT_FOUND);

        const updateUser = user.updateUser(item);
        const result = await userRepo.update(id, updateUser);
        if (!result) throw new ErrorBadRequest(ERROR_NOT_UPDATE);

        return result;
    };

    return execute;
};

export { build };
