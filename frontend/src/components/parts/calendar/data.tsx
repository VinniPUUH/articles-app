import { forwardRef } from "react";

import styles from "./calendar.module.scss"

const CalendarInput = forwardRef(({ value, onClick, isValueSelected, clearValue }: any, ref: any) => {
    return (
        <button className={styles.calendarInput} onClick={onClick} ref={ref} type="button">
            {isValueSelected ? value : <span className={styles.placeholder} >Choose date</span>}
            {isValueSelected ? <span onClick={clearValue} className={styles.clear}></span> : null}
        </button>
    )
});

export { CalendarInput }

