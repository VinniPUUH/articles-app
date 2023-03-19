import { EventHandler, FC, MouseEventHandler } from "react"
import { Link } from "react-router-dom";

import Button from "components/parts/button/button";

import { ARTICLE_ROUTE } from "constants/routes-data";

import styles from "./article-card.module.scss"

interface IArticleCard {
    title: string,
    date: Date,
    id: string
    onDelete?: (id: string) => void
}

const ArticleCard: FC<IArticleCard> = ({ id, title, date, onDelete }) => {
    const deleteHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        onDelete && onDelete(id)
    }

    return (
        <Link to={`${ARTICLE_ROUTE}/${id}`}>
            <div className={styles.card}>
                <p className={styles.title}>{title}</p>
                <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
                <div className={styles.deleteButton}>
                    <Button text="Delete article" onClick={deleteHandler} />
                </div>
            </div>
        </Link>

    )
}

export default ArticleCard