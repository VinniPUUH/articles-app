import { ChangeEvent, useCallback, useState, lazy, Suspense } from "react";
import { useDebounce } from 'use-debounce';

import ArticleCard from "components/cards/article-card/article-card";
import Input from "components/parts/input/input";
import Calendar from "components/parts/calendar/calendar";
import Button from "components/parts/button/button";
import Loader from "components/parts/loader/loader";

import useArticleFilter from "hooks/useArticleFilter";
import useArticles from "store/articles/useArticles";

import { IArticle } from "constants/types/articles.types";

import styles from "./main.module.scss"

const ArticleForm = lazy(() => import('components/forms/article-form'));

const MainPage = ({ isLoading }: { isLoading: boolean }) => {
  const [searchValue, setSearchValue] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isShowEditForm, setShowEditForm] = useState(false)

  const [debouncedSearhValue] = useDebounce(searchValue, 500);

  const { articles, deleteArticle } = useArticles()

  const searchHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value)
    }, [])

  const calendarHandler = useCallback(
    (dates: (Date | null)[]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }, [])

  const deleteHandler = (id: string) => {
    deleteArticle(id)
  }

  const toggleEditForm = useCallback(
    () => {
      setShowEditForm((prevValue => !prevValue))
    }, [])

  const filteredArticles = useArticleFilter({ articles, debouncedSearhValue, startDate, endDate })

  return (
    <div>
      <h1 className={styles.title}>Articles App</h1>
      <div className={styles.filters}>
        <div className={styles.searchInput}>
          <Input value={searchValue} changeHandler={searchHandler} placeholder="Search" />
        </div>
        <div className={styles.calendar}>
          <Calendar startDate={startDate} endDate={endDate} onChange={calendarHandler} />
        </div>
        <div className={styles.editBtn}>
          <Button onClick={toggleEditForm} text={isShowEditForm ? "Close form" : "Add article"} />
        </div>
      </div>

      {isShowEditForm &&
        <Suspense fallback={<Loader />}>
          <ArticleForm callback={toggleEditForm} />
        </Suspense>
      }


      <div className={styles.cardList}>
        {isLoading && <Loader />}
        {!isLoading && (filteredArticles.length ?
          filteredArticles.map(({ title, id, date }: IArticle) =>
            <div key={id} className={styles.cardWrapper}>
              <ArticleCard id={id} title={title} date={date} onDelete={deleteHandler} />
            </div>)
          :
          <div>No search results</div>)}
      </div>
    </div>
  );
};

export default MainPage;