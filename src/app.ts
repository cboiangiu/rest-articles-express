import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Container } from 'inversify';
import "reflect-metadata";
import { InversifyExpressServer } from 'inversify-express-utils';
import helmet from 'helmet';
import './controllers/articles.controller';
import ArticleRepository from './data/repositories/article.repository';
import IArticleRepository from './interfaces/repositories/article-repository.interface';
import { TYPES } from './constants/types';
import IArticleService from './interfaces/services/article-service.interface';
import ArticleService from './services/article.service';
import MyMongoDB from './data/db/mongodb';

async function bootstrap() {
    dotenv.config();

    const container = new Container();

    container.bind<MyMongoDB>(TYPES.MyMongoDB).to(MyMongoDB).inSingletonScope();
    await container.get<MyMongoDB>(TYPES.MyMongoDB).connect();
    container.bind<IArticleRepository>(TYPES.IArticleRepository).to(ArticleRepository).inRequestScope();
    container.bind<IArticleService>(TYPES.IArticleService).to(ArticleService).inRequestScope();

    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(helmet());
    });

    const app = server.build();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

bootstrap();
