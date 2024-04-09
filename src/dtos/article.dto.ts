export class CreateArticleDTO {
    readonly title: string;
    readonly content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

export class ReadArticleDTO {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly publishedDate: Date;

    constructor(id: string, title: string, content: string, publishedDate: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.publishedDate = publishedDate;
    }
}

export class UpdateArticleDTO {
    readonly title: string;
    readonly content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}
