import { Title } from '@users/enterprise_bussines/bases/title_enum';

const searchUserTitle = (title: string) => {
    let userTitle = 'mr';
    switch (title.toUpperCase()) {
        case Title.MRS:
        case Title.MS:
            userTitle = title;
            break;
        default:
            break;
    }
    return userTitle;
};

export { searchUserTitle };
