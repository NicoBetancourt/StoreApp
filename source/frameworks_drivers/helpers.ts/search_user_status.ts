import { Status } from '@users/enterprise_bussines/bases/status_enum';

const searchUserStatus = (status: string) => {
    let userStatus = 'disabled';
    switch (status.toUpperCase()) {
        case Status.ENABLED:
        case Status.PENDING:
        case Status.WEB_SERVICES_ONLY:
            userStatus = status;
            break;
        default:
            break;
    }
    return userStatus;
};

export { searchUserStatus };
