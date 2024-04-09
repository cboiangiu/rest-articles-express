import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, queryParam } from 'inversify-express-utils';
import IArticleService from '../interfaces/services/article-service.interface';
import { CreateArticleDTO, ReadArticleDTO, UpdateArticleDTO } from '../dtos/article.dto';
import NotFoundError from '../errors/not-found.error';
import ArgumentNullError from '../errors/argument-null.error';
import TYPES from '../constants/types';
import TextTooLongError from '../errors/text-too-long.error';

@controller('/articles')
class ArticlesController {
    constructor(@inject(TYPES.IArticleService) private articleService: IArticleService) { }

    @httpGet('/')
    async getAllArticles(
        @queryParam('pageNumber') pageNumber: number,
        @queryParam('pageSize') pageSize: number,
        _: Request,
        res: Response
    ): Promise<Response<ReadArticleDTO[]>> {
        const result = await this.articleService.getAllArticles(pageNumber, pageSize);
        if (result.isSuccess)
            return res.json(result.result);

        return res.status(500);
    }

    @httpGet('/:id')
    async getArticleById(
        @requestParam('id') id: string,
        _: Request,
        res: Response
    ): Promise<Response<ReadArticleDTO>> {
        const result = await this.articleService.getArticleById(id);
        if (result.isSuccess)
            return res.json(result.result);

        if (result.error instanceof NotFoundError)
            return res.status(404);
        return res.status(500);
    }

    @httpPost('/')
    async createArticle(
        @requestBody() articleDto: CreateArticleDTO,
        _: Request,
        res: Response
    ): Promise<Response<ReadArticleDTO>> {
        const result = await this.articleService.createArticle(articleDto);
        if (result.isSuccess)
            return res.status(201).json(result.result);

        if (result.error instanceof NotFoundError || result.error instanceof ArgumentNullError)
            return res.status(400);
        return res.status(500);
    }

    @httpPut('/:id')
    async updateArticle(
        @requestParam('id') id: string,
        @requestBody() articleDto: UpdateArticleDTO,
        _: Request,
        res: Response
    ): Promise<Response<ReadArticleDTO>> {
        const result = await this.articleService.updateArticle(id, articleDto);
        if (result.isSuccess)
            return res.json(result.result);

        if (result.error instanceof NotFoundError)
            return res.status(404);
        if (result.error instanceof TextTooLongError || result.error instanceof ArgumentNullError)
            return res.status(400);
        return res.status(500);
    }

    @httpDelete('/:id')
    async deleteArticle(
        @requestParam('id') id: string,
        _: Request,
        res: Response
    ): Promise<Response> {
        const result = await this.articleService.deleteArticle(id);
        if (result.isSuccess)
            return res.status(204);

        if (result.error instanceof NotFoundError)
            return res.status(404);
        return res.status(500);
    }
}

export default ArticlesController;
