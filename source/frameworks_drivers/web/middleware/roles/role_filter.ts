import { Request, Response, NextFunction } from 'express';
import { snakeToCamel } from 'frameworks_drivers/helpers.ts/from_snake_to_camel';

export default function filter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const query: any = req.query;
    const mapFilter: any = {};
    for (const key in query) {
        if (key !== 'limit' && key !== 'offset' && query[key] !== undefined) {
            switch (key) {
                case 'name':
                    mapFilter[snakeToCamel(key)] = query[key];
                    break;
                case 'scopes':
                    mapFilter[key] = query[key];
                    break;

                default:
                    break;
            }
        }
    }
    req.query.filter = mapFilter;
    next();
}
