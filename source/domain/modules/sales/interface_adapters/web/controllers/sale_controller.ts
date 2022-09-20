import { ISaleFDOM } from './../../../enterprise_business/entities/sale_dom';
import mapper from './mappers/sale_mapper';
import service from 'domain/modules/sales/app_business_rules';
import { HTTPCodesEnum } from 'domain/modules/common/enterprise_business/dto/enums/errors_enums';
import { ApiResponse } from 'domain/modules/common/enterprise_business/dto/responses/api_response';
import { ListResponse } from 'domain/modules/common/enterprise_business/dto/responses/list_response';
import { NextFunction, Request, Response } from 'express';
import { fromISOToDate } from 'frameworks_drivers/external_interface/datetime';


export class SaleController {
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

    async createMany(req: any, res: Response, next: NextFunction) {
        try {// Funciona, pero se puede hacer mejor?
            const mapItems = async (items: any[],Metodo:Function) => {
                const itemsFin: any[] = [];
                for (const item of items) {
                    const entity = Metodo(item)
                    itemsFin.push(entity);
                }
                return itemsFin;
            };
            const body = req.body;
            const salesDOM = await mapItems(body,mapper.fromApiToDom);
            const sales = await service.createMany(salesDOM)
            const salesAPI = await mapItems(sales,mapper.fromDomToApi);
            res.status(HTTPCodesEnum.CREATED).json(
                new ApiResponse(
                    HTTPCodesEnum.CREATED,
                    salesAPI
                )
            );
            
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            let filter = req.time
            if (!req.time) filter = {}
            const result = await service.getAll.execute(filter);
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

    async dailyReport(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const filter: ISaleFDOM = {}
            filter.time = new Date(req.params.time+"T00:00:00.000Z")
            const result = await service.dailyReport.execute(filter);
            res.status(HTTPCodesEnum.SUCCESSFUL).json(
                new ApiResponse(
                    HTTPCodesEnum.SUCCESSFUL,
                    new ListResponse(result)
                )
            );
        } catch (err) {
            next(err);
        }
    }
}