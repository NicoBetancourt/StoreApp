import crypto from 'crypto';
import { generate, GenerateOptions } from 'generate-password';

export type hashPwdFn = (pwd: string) => IPasswordHasherResult;
export type validatePwdFn = (
    password: string,
    password_salt: string,
    hashed: string
) => boolean;
export type generateRandomPasswordFn = (
    options?: GenerateOptions | undefined
) => string;

export interface IPasswordHasherResult {
    password: string;
    password_salt: string;
}

export class HasherPasswordResult implements IPasswordHasherResult {
    password: string;
    password_salt: string;

    constructor(password: string, password_salt: string) {
        this.password = password;
        this.password_salt = password_salt;
    }
}

const SIZE = 64;
const ENCODING = 'hex';
const ALGORITHM = 'sha256';

const hashPwd: hashPwdFn = (password: string) => {
    const salt = crypto.randomBytes(SIZE).toString(ENCODING);
    const hashed = crypto
        .createHmac(ALGORITHM, salt)
        .update(password)
        .digest(ENCODING);
    return new HasherPasswordResult(hashed, salt);
};

/**
 * @param {string} password : Password suministred by user
 * @param {string} password_salt : password_salt field saved in db on user register
 * @param {string} hashed : password fielf saved in db on user register
 */
const validatePwd: validatePwdFn = (
    password: string,
    password_salt: string,
    hashed: string
) => {
    const toVerify = crypto
        .createHmac(ALGORITHM, password_salt)
        .update(password)
        .digest(ENCODING);
    return hashed === toVerify;
};

const generateRandomPassword: generateRandomPasswordFn = (
    options?: GenerateOptions
) => {
    return generate(options);
};

const service = {
    hashPwd,
    validatePwd,
    generateRandomPassword,
};
export default service;
export { hashPwd, validatePwd, generateRandomPassword };
