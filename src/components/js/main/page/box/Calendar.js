import DatePicker from "react-datepicker";
import {useState} from "react";
import {ko} from "date-fns/locale";

const _ = require("lodash");
const {getYear} = require("date-fns");

function Calendar(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const years = _.range(getYear(new Date()), getYear(new Date())+1,1)
    const months = [_.range(1,13)]

    return(
        <>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat={"yyyy-MM-dd"}
                locale={ko}
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                dateFormat={"yyyy-MM-dd"}
                locale={ko}
            />
        </>
    )
}

export default Calendar;