import { FC, memo } from "react"
import DatePicker from "react-datepicker";

import { CalendarInput } from "./data";

import "react-datepicker/dist/react-datepicker.css";

interface ICalendar {
    startDate: Date | null
    endDate: Date | null
    onChange: (dates: (Date | null)[]) => void
}

const Calendar: FC<ICalendar> = ({ ...props }) => {
    const isValueSelected = Boolean(props.startDate) && Boolean(props.endDate)

    const clearValue = (event: MouseEvent) => {
        event.stopPropagation()
        props.onChange([null, null])
    }

    return (
        <DatePicker
            customInput={
                <CalendarInput
                    isValueSelected={isValueSelected}
                    clearValue={clearValue} />
            }
            selectsRange
            {...props}
        />
    )
}

export default memo(Calendar)