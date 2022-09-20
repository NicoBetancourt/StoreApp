import { BaseError } from '../../bases/base_error';
import { ErrorsEnum } from '../enums/errors_enums';

export class ErrorAuth extends BaseError {
    constructor(message: string, http_code: number, metadata?: any) {
        super(`${message}`, ErrorsEnum.HTTP_REQUEST, http_code, metadata);
    }
}
