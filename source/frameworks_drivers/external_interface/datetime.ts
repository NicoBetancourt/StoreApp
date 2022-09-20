import { ErrorBadRequest } from 'domain/modules/common/enterprise_business/dto/errors/bad_request';
import { DateTime } from 'luxon';

enum Time {
    DAYS = "days",
    MONTHS = "months",
    MINUTES = "minutes"
}

export type getCurrentDateFn = () => Date;
export type getLastDaysFn = (date: Date, daysPlus: number) => Date;
export type setUTCDateFn = (date: Date) => Date;
export type fromISOToDateFn = (date: string) => Date;
export type changeFormatFn = (date: Date) => string;
export type dateValidatorFn = (date: string) => boolean;
export type validToFn = () => Date;
export type checkISOFormat1Fn = (string: string) => boolean;
export type setIsoDateFn = (date: Date) => Date;
type addTimeToSepecificDateFn = (qty: number, date: DateTime, time: Time) => DateTime;
type isoDateStringToDateTimeFn = (isoDate: string) => DateTime;
type dateToDateTimeFn = (isoDate: Date) => DateTime;

type setUTCZeroDate = (date: DateTime) => Date;

const UTC_TIMEZONE = 'Atlantic/St_Helena';

export enum DateStringFormatEnum {
    DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss',
    TIME_FORMAT = 'HH:mm:ss',
    DATE_FORMAT = 'yyyy-MM-dd',
    CHANGE_LOG_DATE_FORMAT = 'yyyy/MM/dd HH:mm:ss',
    QUARTER_FORMAT = "yyyy-'Q'q",
}

const getCurrentDate: getCurrentDateFn = () => {
    const UTCDate = setUTCZeroDate(DateTime.now());
    return UTCDate;
};

const dateToDateTime: dateToDateTimeFn = (value:Date) => {
    // const UTCDate = setUTCZeroDate(DateTime.now());
    const datetime = DateTime.fromJSDate(value); 
    return datetime;
};


const getLastDays: getLastDaysFn = (date: Date, days: number) => {
    const sevenLastDays = setUTCZeroDate(
        DateTime.fromJSDate(date).minus({ days })
    );
    return sevenLastDays;
};
const setUTCDate: setUTCDateFn = (date: Date) => {
    const UTCDate = setUTCZeroDate(DateTime.fromJSDate(date));
    return UTCDate;
};

const setIsoDate: setIsoDateFn = (date: Date) => {
    const isoDate = new Date(date.toISOString());
    return isoDate;
};

const validTo: validToFn = () => {
    const dateValidTo = setUTCZeroDate(DateTime.now().plus({ months: 4 }));
    return dateValidTo;
};

const fromISOToDate = (isoDate: string) => {
    if (checkISOFormat(isoDate)) throw new ErrorBadRequest('Date its no valid');
    const resultDate = setUTCZeroDate(DateTime.fromISO(isoDate));
    return resultDate;
};

const setUTCZeroDate: setUTCZeroDate = (date: DateTime) => {
    return new Date(
        date
            .setZone(UTC_TIMEZONE)
            .toFormat(DateStringFormatEnum.DATE_TIME_FORMAT)
    );
};

const dateValidator: dateValidatorFn = (date: string) => {
    const resultDate = DateTime.fromSQL(date);
    return resultDate.isValid;
};

const changeFormatLog: changeFormatFn = (date: Date) => {
    const resultDate = DateTime.fromJSDate(date);
    const parse = resultDate.toFormat(
        DateStringFormatEnum.CHANGE_LOG_DATE_FORMAT
    );
    return parse;
};

const changeFormatSemester: changeFormatFn = (date: Date) => {
    const resultDate = DateTime.fromJSDate(date);

    if (resultDate.month >= 1 && resultDate.month <= 6) {
        return `${resultDate.year}-S1`;
    } else {
        return `${resultDate.year}-S2`;
    }
};

const changeFormatQuarter: changeFormatFn = (date: Date) => {
    const resultDate = DateTime.fromJSDate(date);
    const parse = resultDate.toFormat(DateStringFormatEnum.QUARTER_FORMAT);
    return parse;
};

const checkISOFormat: checkISOFormat1Fn = (item: string) => {
    const ISO8601RegExp =
        /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
    return ISO8601RegExp.test(item);
};

const addTimeToSepecificDate: addTimeToSepecificDateFn = (qty: number, date: DateTime, time: Time) => {
    const addTime: any = {}
    addTime[time] = qty
    const dateAdded = date.plus(addTime);
    return dateAdded;
}
const isoDateStringToDateTime: isoDateStringToDateTimeFn = (isoDate: string) => {
    const date = DateTime.fromISO(isoDate);
    return date;
}

const service = {
    fromISOToDate,
    getCurrentDate,
    setUTCDate,
    dateValidator,
    validTo,
    checkISOFormat,
    changeFormatLog,
    getLastDays,
    setIsoDate,
    changeFormatSemester,
    changeFormatQuarter,
    
    
};
export default service;
export {
    fromISOToDate,
    getCurrentDate,
    setUTCDate,
    dateValidator,
    validTo,
    checkISOFormat,
    changeFormatLog,
    getLastDays,
    setIsoDate,
    changeFormatSemester,
    changeFormatQuarter,
    Time,
    isoDateStringToDateTime,
    isoDateStringToDateTimeFn,
    addTimeToSepecificDate,
    addTimeToSepecificDateFn,
    dateToDateTime,
    dateToDateTimeFn
};
