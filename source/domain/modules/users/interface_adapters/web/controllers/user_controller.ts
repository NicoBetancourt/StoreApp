import mapper from './mappers/user_mapper';
import service from 'domain/modules/users/app_business_rules';
import { HTTPCodesEnum } from 'domain/modules/common/enterprise_business/dto/enums/errors_enums';
import { ApiResponse } from 'domain/modules/common/enterprise_business/dto/responses/api_response';
import { ListResponse } from 'domain/modules/common/enterprise_business/dto/responses/list_response';
import { NextFunction, Request, Response } from 'express';


export class UserController {
    async createOne(req: any, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await service.createOne(
                mapper.fromApiToDom(body),
            );
            res.status(HTTPCodesEnum.CREATED).json(
                new ApiResponse(
                    HTTPCodesEnum.CREATED,
                    mapper.fromDomToApi(result)
                )
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await service.getAll.execute();
            res.status(HTTPCodesEnum.SUCCESSFUL).json(
                new ApiResponse(
                    HTTPCodesEnum.SUCCESSFUL,
                    new ListResponse(result.map(mapper.fromDomToApi))
                )
            );
        } catch (err) {
            next(err);
        }
    }

    async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const result = await service.getOne.execute(id);
            res.status(HTTPCodesEnum.SUCCESSFUL).json(
                new ApiResponse(
                    HTTPCodesEnum.SUCCESSFUL,
                    mapper.fromDomToApi(result)
                )
            );
        } catch (err) {
            next(err);
        }
    }

    async updateOne(req: any, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const body = req.body;
            const result = await service.updateOne(
                id,
                mapper.fromApiToDom(body),
                // full_name,
                // username
            );
            res.status(HTTPCodesEnum.SUCCESSFUL).json(
                new ApiResponse(
                    HTTPCodesEnum.SUCCESSFUL,
                    mapper.fromDomToApi(result)
                )
            );
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const result = await service.getOne.execute(id);
            if (!result) throw new Error('Id not found')
            await service.deleteOne(id);
            res.status(HTTPCodesEnum.SUCCESSFUL)
            .json(
                new ApiResponse(
                    HTTPCodesEnum.SUCCESSFUL,
                    mapper.fromDomToApi(result)
                )
            );
        } catch (err) {
            next(err);
        }
    }
}