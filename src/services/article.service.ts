import { inject, injectable } from "inversify";
import { ReadArticleDTO, CreateArticleDTO, UpdateArticleDTO } from "../dtos/article.dto";
import ServiceResult from "../infrastructure/service-result";
import IArticleService from "../interfaces/services/article-service.interface";
import TYPES from "../constants/types";
import IArticleRepository from "../interfaces/repositories/article-repository.interface";
import Article from "../entities/article.entity";
import NotFoundError from "../errors/not-found.error";

@injectable()
class ArticleService implements IArticleService {
    private articleRepository: IArticleRepository;

    constructor(
        @inject(TYPES.IArticleRepository) articleRepository: IArticleRepository
    ) {
        this.articleRepository = articleRepository;
    }

    async getAllArticles(pageNumber: number, pageSize: number): Promise<ServiceResult<ReadArticleDTO[]>> {
        try {
            const articleDAOs = await this.articleRepository.getAllPaginated(pageNumber, pageSize);
            const articleDTOs = articleDAOs.map(article => Article.fromDAO(article).toReadArticleDTO());
            return ServiceResult.success(articleDTOs);
        } catch (e) {
            return ServiceResult.fail(e as Error);
        }
    }

    async getArticleById(id: string): Promise<ServiceResult<ReadArticleDTO>> {
        const articleDAO = await this.articleRepository.getById(id);
        if (!articleDAO) {
            return ServiceResult.fail(new NotFoundError('Article'));
        }

        const articleDTO = Article.fromDAO(articleDAO).toReadArticleDTO();

        return ServiceResult.success(articleDTO);
    }

    async createArticle(article: CreateArticleDTO): Promise<ServiceResult<ReadArticleDTO>> {
        const newArticle = Article.create();
        try {
            newArticle.title = article.title;
            newArticle.content = article.content;
            const articleDAO = await this.articleRepository.add(newArticle.toDAO());
            const articleDTO = Article.fromDAO(articleDAO).toReadArticleDTO();
            return ServiceResult.success(articleDTO);
        } catch (e) {
            return ServiceResult.fail(e as Error);
        }
    }

    async updateArticle(id: string, article: UpdateArticleDTO): Promise<ServiceResult<ReadArticleDTO>> {
        const foundArticleDAO = await this.articleRepository.getById(id);
        if (!foundArticleDAO) {
            return ServiceResult.fail(new NotFoundError('Article'));
        }

        try {
            const updatedArticle = Article.fromDAO(foundArticleDAO);
            updatedArticle.title = article.title;
            updatedArticle.content = article.content;
            const updatedArticleDAO = await this.articleRepository.update(updatedArticle.toDAO());
            const articleDTO = Article.fromDAO(updatedArticleDAO).toReadArticleDTO();
            return ServiceResult.success(articleDTO);
        } catch (e) {
            return ServiceResult.fail(e as Error);
        }
    }

    async deleteArticle(id: string): Promise<ServiceResult<ReadArticleDTO>> {
        const foundArticleDAO = await this.articleRepository.getById(id);
        if (!foundArticleDAO) {
            return ServiceResult.fail(new NotFoundError('Article'));
        }

        try {
            await this.articleRepository.remove(id);
            return ServiceResult.success(Article.fromDAO(foundArticleDAO).toReadArticleDTO());
        } catch (e) {
            return ServiceResult.fail(e as Error);
        }
    }
}

export default ArticleService;
