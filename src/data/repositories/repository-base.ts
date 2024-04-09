import { Document, Model, Mongoose } from "mongoose";
import IRepositoryBase from "../../interfaces/repositories/repository-base.interface";
import { injectable } from "inversify";

@injectable()
class RepositoryBase<T extends Document> implements IRepositoryBase<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async add(entity: T): Promise<T> {
        return await this.model.create(entity);
    }

    async getById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async getAll(): Promise<T[]> {
        return await this.model.find();
    }

    async getAllPaginated(pageNumber: number, pageSize: number): Promise<T[]> {
        pageNumber = Math.abs(pageNumber);
        pageSize = Math.abs(pageSize);

        return await this.model.find().skip(pageSize * pageNumber).limit(pageSize);
    }

    async update(entity: T): Promise<T> {
        return (await this.model.findByIdAndUpdate(entity._id, entity as Partial<T>, { new: true }))!;
    }

    async remove(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }
}

export default RepositoryBase;
