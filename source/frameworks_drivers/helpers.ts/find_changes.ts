import { Resources } from '@changelogs/enterprise_business/bases/changelog_enum';
import { validatorIdThatWorks } from '@fnd/storage/mongo/client/driver/factory_id';
import { IOperations } from '@fnd/storage/mongo/client/interfaces/ioperations';
import {
    IUsersFDom,
    UsersDOM,
} from '@users/enterprise_bussines/entities/users/users_dom';
import {
    GroupDOM,
    IGroupFDOM,
} from '@groups/enterprise_business/entities/group/group_dom';
import {
    CustomerDOM,
    ICustomerFDOM,
} from '@customers/enterprise_business/entities/customer/customer_dom';
import {
    DistributorDOM,
    IDistributorFDOM,
} from '@distributors/enterprise_business/entities/distributor/distributor_dom';
import {
    IProductFDOM,
    ProductDOM,
} from '@products/enterprise_business/entities/product/product_dom';
import {
    IReasonForExchangeFDOM,
    ReasonForExchangeDOM,
} from '@reasons_for_exchange/enterprise_business/entities/reason_for_exchange/reason_for_exchange_dom';
import {
    IReasonForRefusalDOM,
    ReasonForRefusalDOM,
} from '@reasons_for_refusal/enterprise_business/entities/reason_for_refusal/reason_for_refusal_dom';
import {
    BrandDOM,
    IBrandFDOM,
} from '@brands/enterprise_business/entities/brand/brand_dom';

export interface IResourceChanges {
    field: string;
    before: string | null;
    after: string | null;
}

export type FindChanges = (
    before: string,
    after: string,
    {
        usersRepo,
        groupRepo,
        customerRepo,
        distributorRepo,
        productRepo,
        reasonForExchangeRepo,
        reasonForRefusalRepo,
        brandRepo,
    }: Dependencies,
    parentField?: string | undefined
) => Promise<IResourceChanges[]>;

type Dependencies = {
    usersRepo: IOperations<UsersDOM, IUsersFDom>;
    groupRepo: IOperations<GroupDOM, IGroupFDOM>;
    customerRepo: IOperations<CustomerDOM, ICustomerFDOM>;
    distributorRepo: IOperations<DistributorDOM, IDistributorFDOM>;
    productRepo: IOperations<ProductDOM, IProductFDOM>;
    reasonForExchangeRepo: IOperations<
        ReasonForExchangeDOM,
        IReasonForExchangeFDOM
    >;
    reasonForRefusalRepo: IOperations<
        ReasonForRefusalDOM,
        IReasonForRefusalDOM
    >;
    brandRepo: IOperations<BrandDOM, IBrandFDOM>;
};

/**
 *
 * @param before Any resource stringify
 * @param after Any resource stringify
 */
const findChanges = async (
    before: string,
    after: string,
    {
        usersRepo,
        groupRepo,
        customerRepo,
        distributorRepo,
        productRepo,
        reasonForExchangeRepo,
        reasonForRefusalRepo,
        brandRepo,
    }: Dependencies,
    parentField?: string
) => {
    const beforeParse = JSON.parse(before);
    const afterParse = JSON.parse(after);

    let changes: IResourceChanges[] = [];

    for (const key in beforeParse) {
        const typeBefore = typeof beforeParse[key] === 'object';
        const typeAfter = typeof afterParse[key] === 'object';
        if (typeBefore && typeAfter) {
            const changesNested = await findChanges(
                JSON.stringify(beforeParse[key]),
                JSON.stringify(afterParse[key]),
                {
                    usersRepo,
                    groupRepo,
                    customerRepo,
                    distributorRepo,
                    productRepo,
                    reasonForExchangeRepo,
                    reasonForRefusalRepo,
                    brandRepo,
                },
                key
            );
            changes = changes.concat(changesNested);
        } else if (beforeParse[key] !== afterParse[key]) {
            if (!(key == 'updatedAt')) {
                changes.push({
                    field: parentField ? `${parentField}.${key}` : key,
                    after: await verifyKey(afterParse, key, {
                        usersRepo,
                        groupRepo,
                        customerRepo,
                        distributorRepo,
                        productRepo,
                        reasonForExchangeRepo,
                        reasonForRefusalRepo,
                        brandRepo,
                    }),
                    before: await verifyKey(beforeParse, key, {
                        usersRepo,
                        groupRepo,
                        customerRepo,
                        distributorRepo,
                        productRepo,
                        reasonForExchangeRepo,
                        reasonForRefusalRepo,
                        brandRepo,
                    }),
                });
            }
        }
    }

    return changes;
};

const verifyKey = (
    entityParser: any,
    key: string,
    {
        usersRepo,
        groupRepo,
        customerRepo,
        distributorRepo,
        productRepo,
        reasonForExchangeRepo,
        reasonForRefusalRepo,
        brandRepo,
    }: Dependencies
) => {
    if (typeof entityParser[key] == 'boolean') {
        return entityParser[key] == true ? 'Yes' : 'No';
    }

    if (validatorIdThatWorks(entityParser[key])) {
        if (key == 'exchangeReasonId') {
            return replaceIdKey(
                entityParser[key],
                Resources.REASONS_FOR_EXCHANGE,
                {
                    usersRepo,
                    groupRepo,
                    customerRepo,
                    distributorRepo,
                    productRepo,
                    reasonForExchangeRepo,
                    reasonForRefusalRepo,
                    brandRepo,
                }
            );
        }

        if (key == 'refusalReasonId') {
            return replaceIdKey(
                entityParser[key],
                Resources.REASONS_FOR_REFUSAL,
                {
                    usersRepo,
                    groupRepo,
                    customerRepo,
                    distributorRepo,
                    productRepo,
                    reasonForExchangeRepo,
                    reasonForRefusalRepo,
                    brandRepo,
                }
            );
        }

        const formatKey = key.replace('Id', '');
        return replaceIdKey(entityParser[key], formatKey, {
            usersRepo,
            groupRepo,
            customerRepo,
            distributorRepo,
            productRepo,
            reasonForExchangeRepo,
            reasonForRefusalRepo,
            brandRepo,
        });
    }

    return `${entityParser[key]}`;
};

const replaceIdKey = async (
    id: string,
    key: string,
    {
        usersRepo,
        groupRepo,
        customerRepo,
        distributorRepo,
        productRepo,
        reasonForExchangeRepo,
        reasonForRefusalRepo,
        brandRepo,
    }: Dependencies
): Promise<string> => {
    switch (key) {
        case Resources.USERS: {
            const item = await usersRepo.getOne(id);
            if (item) return item.username;
            break;
        }

        case Resources.GROUPS: {
            const item = await groupRepo.getOne(id);
            if (item) return item.code;
            break;
        }

        case Resources.CUSTOMERS: {
            const item = await customerRepo.getOne(id);
            if (item) {
                const userId = item.user;
                const user = await usersRepo.getOne(userId);
                if (user) return user.username;
            }

            break;
        }

        case Resources.DISTRIBUTORS: {
            const item = await distributorRepo.getOne(id);
            if (item) return item.code;
            break;
        }

        case Resources.PRODUCTS: {
            const item = await productRepo.getOne(id);
            if (item) return item.name;
            break;
        }

        case Resources.REASONS_FOR_EXCHANGE: {
            const item = await reasonForExchangeRepo.getOne(id);
            if (item) return item.label;
            break;
        }

        case Resources.REASONS_FOR_REFUSAL: {
            const item = await reasonForRefusalRepo.getOne(id);
            if (item) return item.label;
            break;
        }

        case Resources.BRANDS: {
            const item = await brandRepo.getOne(id);
            if (item) return item.code;
            break;
        }
    }

    return '';
};

export { findChanges };
