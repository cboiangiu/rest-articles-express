import { Document } from "mongoose";

interface IRepositoryBase<T extends Document> {
    add(entity: T): Promise<T>;
    getById(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    getAllPaginated(pageNumber: number, pageSize: number): Promise<T[]>;
    update(entity: T): Promise<T>;
    remove(id: string): Promise<void>;
}

export default IRepositoryBase;
