import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from 'pages/main/main'
import Article from "pages/article/article";
import BaseContainer from "components/containers/base-container/base-container";

import useArticles from "store/articles/useArticles";

import { getRequest } from "api/axios"
import { MAIN_ROUTE, ARTICLE_ROUTE } from "constants/routes-data";
import { API_ROUTE } from "constants/api-routes";

import "styles/app.css"

function App() {
  const [isLoading, setLoading] = useState(false)

  const { setArticles } = useArticles()

  useEffect(() => {
    setLoading(true)
    const getArticles = async () => {
      try {
        const response = await getRequest(API_ROUTE.ARTICLE)
        setArticles(response.data)
        setLoading(false)
      } catch (error) {
        console.log("Load articles error");
      }
    }

    getArticles()
  }, [])

  return (
    <BaseContainer>
      <Routes>
        <Route path={MAIN_ROUTE} element={<MainPage isLoading={isLoading} />} />
        <Route path={`${ARTICLE_ROUTE}/:id`} element={<Article />} />
      </Routes>
    </BaseContainer>
  )
}

export default App
