import { Document, Types } from "mongoose";

interface ArticleDAO extends Document {
    readonly _id: Types.ObjectId;
    readonly title: string;
    readonly content: string;
    readonly publishedDate: Date;
}

export default ArticleDAO;
