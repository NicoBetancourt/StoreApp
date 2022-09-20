import { AccountType } from '@customers/enterprise_business/bases/account_type_enum';

const searchAccountType = (type: string) => {
    let accountType = 'individual';
    switch (type.toUpperCase()) {
        case AccountType.ARTISAN:
        case AccountType.COMPANY:
            accountType = type;
            break;
        default:
            break;
    }
    return accountType;
};

export { searchAccountType };
