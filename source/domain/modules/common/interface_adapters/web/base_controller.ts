import { NextFunction, Request, Response } from 'express';

export abstract class BaseController {
    abstract post(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
    abstract get(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
    abstract getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
    abstract put(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
    abstract delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
