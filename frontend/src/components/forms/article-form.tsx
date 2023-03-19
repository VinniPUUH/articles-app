import { useState, ChangeEventHandler, FormEventHandler, FC } from "react"

import Input from "components/parts/input/input"
import CalendarSingleDate from "components/parts/calendar/calendar-single-date"
import Button from "components/parts/button/button"

import useArticles from "store/articles/useArticles"

import { postRequest } from "api/axios"
import { API_ROUTE } from "constants/api-routes"
import { IFullArticle } from "constants/types/articles.types"

import styles from "./article-form.module.scss"

const initValues = {
    id: "",
    date: new Date(),
    title: "",
    text: ""
}

interface IArticleForm {
    callback?: () => void
}

const ArticleForm: FC<IArticleForm> = ({ callback }) => {
    const [formData, setFormData] = useState<IFullArticle>(initValues)
    const [error, setError] = useState("")

    const { setArticles } = useArticles()

    const editTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFormData({
            ...formData,
            title: event.target.value
        })
    }

    const editDate = (date: Date | null) => {
        setFormData({
            ...formData,
            date: date || new Date()
        })
    }

    const editText: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFormData({
            ...formData,
            text: event.target.value
        })
    }

    const submit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        if (formData.title && formData.text) {
            try {
                setError("")

                const dataWithId = { ...formData, id: String(new Date().getTime()) }
                const response = await postRequest(API_ROUTE.ARTICLE, dataWithId)

                if (response.status === 200) {
                    const { text, ...articleFormatted } = dataWithId
                    setArticles([articleFormatted])
                    callback && callback()
                }
            } catch (error) {
                console.log("Cannot save article");
            }
        } else {
            setError("Not all data is complete")
        }
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <p>Form to add article</p>
            <div className={styles.titleInput}>
                <Input value={formData.title} changeHandler={editTitle} placeholder="Enter title" />
            </div>
            <div className={styles.calendarInput}>
                <CalendarSingleDate selected={formData.date} onChange={editDate} />
            </div>
            <div className={styles.textInput}>
                <Input value={formData.text} changeHandler={editText} placeholder="Enter text" />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.submitButton}>
                <Button text="Submit" type="submit" />
            </div>
        </form>
    )
}

export default ArticleForm