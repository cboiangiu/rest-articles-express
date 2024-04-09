import ArticleDAO from "../../data/daos/article.dao";
import IRepositoryBase from "./repository-base.interface";

interface IArticleRepository extends IRepositoryBase<ArticleDAO> { }

export default IArticleRepository;
