/**Express functions */
import { Response, NextFunction } from 'express';
import { checkPermissions } from 'domain/modules/roles/app_business_rules/auth';

const checkScopes = (required: string | string[]) => {
    const middleware = async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.header('Authorization');
            await checkPermissions( required, userId);
            next();
        } catch (err) {
            next(err);
        }
    };
    return middleware;
};

export default checkScopes;



