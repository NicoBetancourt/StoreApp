export enum ErrorsEnum {
    UNDEFINED = 1,
    UNHANDLED = 100,
    HTTP_REQUEST = 200,
    DOMAIN_ENTITY_VALIDATION = 300,
    DOMAIN_RULE_EXCEPTION = 400,
    STORAGE_EXCEPTION = 500,
    DOMAIN_EVENTS_VALIDATION_EXCEPTION = 600,
}

export enum HTTPCodesEnum {
    SUCCESSFUL = 200,
    CREATED = 201,
    NOT_CONTENT = 204,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 403,
    RESOURCE_NOT_FOUND = 404,
    FORBIDDEN = 401,
}
