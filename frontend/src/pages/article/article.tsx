import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

import Button from "components/parts/button/button";
import Loader from "components/parts/loader/loader";

import { getRequest } from "api/axios";
import { API_ROUTE } from "constants/api-routes";
import { IFullArticle, IComment } from "constants/types/articles.types"

import styles from "./article.module.scss"

const Commentaries = lazy(() => import('components/commentaries/commentaries'));

const Article = () => {
    const [articleData, setArticleData] = useState<IFullArticle | null>(null)
    const [commentData, setCommentData] = useState<IComment[] | null>(null)
    const [isCommentOpened, setCommentOpened] = useState(false)

    const { id } = useParams();

    const commentToggle = () => {
        setCommentOpened((prevState) => !prevState)
    }

    useEffect(() => {
        const getArticleData = async () => {
            try {
                const response = await getRequest(`${API_ROUTE.ARTICLE}/${id}`)
                setArticleData(response.data)
            } catch (error) {
                console.log("Loading error");
            }
        }
        getArticleData()
    }, [])

    useEffect(() => {
        if (isCommentOpened) {
            const getCommentsData = async () => {
                try {
                    const response = await getRequest(`${API_ROUTE.COMMENTARIES}?article=${id}`)
                    setCommentData(response.data)

                } catch (error) {
                    console.log("Loading error");
                }
            }
            getCommentsData()
        }
    }, [isCommentOpened])

    return (
        <div>
            {articleData ?
                <>
                    <p>{new Date(articleData.date).toLocaleDateString()}</p>
                    <h1 className={styles.title}>{articleData.title}</h1>
                    <p>{articleData.text}</p>
                    <div className={styles.toggleCommentBtn}>
                        <Button
                            onClick={commentToggle}
                            text={isCommentOpened ? "Hide commentaries" : "Show commentaries"}
                        />
                    </div>
                    {isCommentOpened &&
                        <Suspense fallback={<Loader />}>
                            <Commentaries commentaries={commentData} />
                        </Suspense>
                    }
                </>
                :
                <Loader />}
        </div>
    );
};

export default Article;