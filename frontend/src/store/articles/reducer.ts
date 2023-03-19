import { IArticle } from "constants/types/articles.types";
import { IArticlesState } from "./types";

const reducer = {
  SET_ARTICLES: (state: IArticlesState, { payload }: { payload: IArticle[] }) => {
    return { ...state, articles: [...state.articles, ...payload] };
  },
  DELETE_SINGLE_ARTICLE: (state: IArticlesState, { payload }: { payload: string }) => {
    return { ...state, articles: state.articles.filter((item) => item.id !== payload) };
  },
};

export default reducer;
