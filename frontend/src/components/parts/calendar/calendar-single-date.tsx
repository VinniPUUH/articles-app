import { FC, memo } from "react"
import DatePicker from "react-datepicker";

import { CalendarInput } from "./data";

import "react-datepicker/dist/react-datepicker.css";

interface ICalendarSingleDate {
    selected: Date | null
    onChange: (date: (Date | null)) => void
}

const CalendarSingleDate: FC<ICalendarSingleDate> = ({ ...props }) => {
    const clearValue = (event: MouseEvent) => {
        event.stopPropagation()
        props.onChange(null)
    }

    return (
        <DatePicker
            customInput={
                <CalendarInput
                    isValueSelected={props.selected}
                    clearValue={clearValue} />
            }
            {...props}
        />
    )
}

export default memo(CalendarSingleDate)