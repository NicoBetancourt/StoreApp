import { HTTPCodesEnum } from "domain/modules/common/enterprise_business/dto/enums/errors_enums";
import { ErrorAuth } from "domain/modules/common/enterprise_business/dto/errors/auth_error";
import { RoleDOM,IRoleFDOM } from "domain/modules/roles/enterprise_bussines/entities/role_dom";
import { UserDOM,IUserFDOM } from "domain/modules/users/enterprise_business/entities/user_dom";
import { IOperations } from "frameworks_drivers/storage/client/interfaces/ioperations";

type Dependencies = {
    userRepo: IOperations<UserDOM,IUserFDOM>;
    roleRepo: IOperations<RoleDOM,IRoleFDOM>;
};

const build = ({userRepo, roleRepo}:Dependencies) => {
    const execute = async (
        required: string | string[],
        userId: string,
    ) => {

        const user =  await userRepo.getOne(userId)

        if (!user)
            throw new ErrorAuth(
                'User not found',
                HTTPCodesEnum.RESOURCE_NOT_FOUND
            );

        const role =  await roleRepo.getOne(user.role)
        if (!role)
            throw new ErrorAuth(
                user.name + ' does not have an existing role',
                HTTPCodesEnum.RESOURCE_NOT_FOUND
            );

        const scopesInToken = role.scopes

        if (!scopesInToken.length)
            throw new ErrorAuth(
                'Permission denied',
                HTTPCodesEnum.FORBIDDEN
            );
        if (!validatePermissions(required, scopesInToken))
            throw new ErrorAuth(
                'Permission denied',
                HTTPCodesEnum.FORBIDDEN
            );

    };

    const validatePermissions = (
        required: string | string[],
        scopesInToken: string[]
    ) => {
        if (Array.isArray(required)) {
            return required
                .map((require) => {
                    return scopesInToken.some((scope) => scope === require);
                })
                .every((scopeRequired) => scopeRequired);
        } else {
            return scopesInToken.some((scope) => scope === required);
        }
    };

    return execute;
};

export { build };
