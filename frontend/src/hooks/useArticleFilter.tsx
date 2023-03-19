import { useMemo } from "react"

import { IArticle } from "constants/types/articles.types";

interface IUseArticleFilter {
    articles: IArticle[]
    debouncedSearhValue: string
    startDate: (Date | null)
    endDate: (Date | null)
}

const useArticleFilter = ({ articles, debouncedSearhValue, startDate, endDate }: IUseArticleFilter) => {
    const filteredArticles = useMemo(() => {
        const isDateSelected = startDate && endDate

        if (debouncedSearhValue || isDateSelected) {
            return articles.filter((item: IArticle) => {
                const lowerCaseTitle = item.title.toLowerCase()
                const date = new Date(item.date)

                const isValidSearch = debouncedSearhValue ?
                    lowerCaseTitle.includes(debouncedSearhValue.toLowerCase().trim()) : true
                const isValidDate = isDateSelected ? date > startDate && date < endDate : true

                return isValidSearch && isValidDate
            })
        }

        return articles
    }, [articles, debouncedSearhValue, startDate, endDate])

    return filteredArticles
}

export default useArticleFilter