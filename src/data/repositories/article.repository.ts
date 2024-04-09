import mongoose, { Model } from "mongoose";
import ArticleDAO from "../daos/article.dao";
import RepositoryBase from "./repository-base";
import IArticleRepository from "../../interfaces/repositories/article-repository.interface";
import { inject, injectable } from "inversify";
import TYPES from "../../constants/types";
import MyMongoDB from "../db/mongodb";

const ArticleSchema = new mongoose.Schema<ArticleDAO>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    publishedDate: { type: Date, required: true },
});

@injectable()
class ArticleRepository extends RepositoryBase<ArticleDAO> implements IArticleRepository {
    constructor(
        @inject(TYPES.MyMongoDB) myMongoDB: MyMongoDB
    ) {
        const db = myMongoDB.getDb();
        const ArticleModel: Model<ArticleDAO> = db.model('Articles', ArticleSchema);
        super(ArticleModel);
    }
}

export default ArticleRepository;
