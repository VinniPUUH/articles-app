import { FC } from "react";

import { IComment } from "constants/types/articles.types";

import styles from './commentaries.module.scss'

interface ICommentaries {
    commentaries: IComment[] | null
}

const Commentaries: FC<ICommentaries> = ({ commentaries }) => {
    return (
        <div className={styles.wrapper}>
            {commentaries ?
                commentaries.map((item) =>
                    <div key={item.id} className={styles.comment}>
                        <p className={styles.user}>{item.user}</p>
                        <p>{item.text}</p>
                    </div>)
                :
                "No commentaries"}
        </div>)
}

export default Commentaries