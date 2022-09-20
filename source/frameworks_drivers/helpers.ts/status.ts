import { IStatus } from '@exchanges/enterprise_business/entities/exchange/exchange_dom';
import { getCurrentDate } from '@fnd/external_interfaces/datetime';
import { normalizedNameCapitalize } from './format_name';

const addNewStatus = (
    statusName: string,
    version: number,
    username: string
) => {
    const newStatus = {
        version: version,
        user: username,
        status: normalizedNameCapitalize(statusName),
        createdAt: getCurrentDate(),
        finishedAt: null,
    };
    return newStatus;
};

const finishedLastStatus = (item: IStatus) => {
    item.finishedAt = getCurrentDate();
    return item;
};

export { addNewStatus, finishedLastStatus };
