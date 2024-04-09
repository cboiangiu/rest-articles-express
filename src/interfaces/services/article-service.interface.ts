import { CreateArticleDTO, ReadArticleDTO, UpdateArticleDTO } from "../../dtos/article.dto";
import ServiceResult from "../../infrastructure/service-result";

interface IArticleService {
    getAllArticles(pageNumber: number, pageSize: number): Promise<ServiceResult<ReadArticleDTO[]>>;
    getArticleById(id: string): Promise<ServiceResult<ReadArticleDTO>>;
    createArticle(article: CreateArticleDTO): Promise<ServiceResult<ReadArticleDTO>>;
    updateArticle(id: string, article: UpdateArticleDTO): Promise<ServiceResult<ReadArticleDTO>>;
    deleteArticle(id: string): Promise<ServiceResult<ReadArticleDTO>>;
}

export default IArticleService; 
