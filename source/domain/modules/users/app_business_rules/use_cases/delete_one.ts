import { UserDOM,IUserFDOM } from './../../enterprise_business/entities/user_dom';
import { IOperations } from 'frameworks_drivers/storage/client/interfaces/ioperations';
type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
};

const build = ({
    userRepo,
}: Dependencies) => {
    const execute = async (id: string) => {
        const result = await userRepo.delete(id);
        if (!result) throw new Error('Please verify role and changes');

        return result;
    };
    return execute;
};

export { build };
