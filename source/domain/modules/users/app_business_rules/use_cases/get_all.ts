import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';

type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
};

const build = ({ userRepo }: Dependencies) => {
    const execute = async () => {
        const entity = await userRepo.getAll({});
        return entity;
    };

    return { execute };
};

export { build };
