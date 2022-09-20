import { ObjectId, ObjectID } from 'mongodb';

export type validatorIdFn = (id: string) => boolean;
export type idGenFn = () => string;

const idGen = () => {
    return new ObjectId().toHexString();
};

const strToObjectID = (id:string) => {
    return new ObjectID(id)
}

const validatorId = (id: string) => {
    if (!id) return false;
    return ObjectID.isValid(id);
};

const validatorIdThatWorks = (id: string) => {
    if (!id) return false;

    try {
        ObjectID.createFromHexString(id);
    } catch (e) {
        return false;
    }

    return true;
};

const service = { idGen, validatorId, validatorIdThatWorks, strToObjectID };
export default service;
export { idGen, validatorId, validatorIdThatWorks, strToObjectID};
