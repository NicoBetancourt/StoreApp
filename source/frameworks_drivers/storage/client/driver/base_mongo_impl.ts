import { IOperations } from '../interfaces/ioperations';
import { MongoDriver } from './driver';

export abstract class BaseImplementation<TDom, TDal, FDom, FDal>
    extends MongoDriver<TDal,FDal>
    implements IOperations<TDom,FDom>
{
    abstract create(item: TDom): Promise<TDom>;
    abstract update(id: string, item: TDom): Promise<TDom | null>;
    abstract delete(id: string): Promise<boolean>;
    abstract getAll(filter: FDom): Promise<TDom[]>;
    abstract getOne(id: string): Promise<TDom | null>;
    abstract createMany(item: TDom[]): Promise<TDom[]>;
}
