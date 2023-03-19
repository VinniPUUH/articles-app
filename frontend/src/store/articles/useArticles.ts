import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "./articlesSlice";
import { getArticles } from "./selectors";

import { IArticle } from "constants/types/articles.types";

const useArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector(getArticles);

  const setArticles = useCallback((articles: IArticle[]) => {
    dispatch(actions.SET_ARTICLES(articles));
  }, [])

  const deleteArticle = useCallback((id: string) => {
    dispatch(actions.DELETE_SINGLE_ARTICLE(id));
  }, [])

  return {
    articles,
    setArticles,
    deleteArticle
  };
};

export default useArticles;
