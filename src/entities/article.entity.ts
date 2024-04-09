import { Types } from "mongoose";
import ArgumentNullError from "../errors/argument-null.error";
import TextTooLongError from "../errors/text-too-long.error";
import { ReadArticleDTO } from "../dtos/article.dto";
import ArticleDAO from "../data/daos/article.dao";

class Article {
    private _id: Types.ObjectId = new Types.ObjectId();
    private _title: string = '';
    private _content: string = '';
    private _publishedDate: Date = new Date();

    private constructor() { }

    static create(): Article {
        const article = new Article();
        article._publishedDate = new Date();

        return article;
    }

    get id(): Types.ObjectId {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        if (!title || title.trim().length == 0)
            throw new ArgumentNullError();

        if (title.length > Article.titleMaxLength)
            throw new TextTooLongError('title', Article.titleMaxLength);

        this._title = title;
    }

    get content(): string {
        return this._content;
    }

    set content(content: string) {
        if (!content || content.trim().length == 0)
            throw new ArgumentNullError();

        if (content.length > Article.contentMaxLength)
            throw new TextTooLongError('content', Article.contentMaxLength);

        this._content = content;
    }

    get publishedDate(): Date {
        return this._publishedDate;
    }

    static titleMaxLength = 60;
    static contentMaxLength = 20000;

    toReadArticleDTO(): ReadArticleDTO {
        return new ReadArticleDTO(this._id.toHexString(), this._title, this._content, this._publishedDate);
    }

    static fromDAO(value: ArticleDAO): Article {
        const article = Article.create();
        article._id = value._id;
        article._title = value.title;
        article._content = value.content;
        article._publishedDate = value.publishedDate;

        return article;
    }

    toDAO(): ArticleDAO {
        return {
            _id: this._id,
            title: this._title,
            content: this._content,
            publishedDate: this._publishedDate
        } as ArticleDAO;
    }
}

export default Article;