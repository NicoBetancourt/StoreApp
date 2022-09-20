import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
import { makeUser } from '../../enterprise_business/entities';

type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
};

const build = ({ userRepo }: Dependencies) => {
    const execute = async (item: UserDOM ) => {
        const entity = makeUser(item, true);
        const result = await userRepo.create(entity);
        return result;
    };
    return execute;
};

export { build };
