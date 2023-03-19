interface IArticle {
    id: string;
    title: string
    date: Date
}

interface IFullArticle extends IArticle {
    text: string
}

interface IComment {
    article: string
    id: number;
    text: string
    user: string
}

export type { IArticle, IFullArticle, IComment };