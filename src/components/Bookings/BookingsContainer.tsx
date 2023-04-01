import { useState } from 'react';
import Bookings from "./Bookings";


const BookingsContainer = () => {
    const [date, setDate] = useState<Date>(new Date());

    const decreaseDate = () => {
        let prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1);
        setDate(prevDate);
    }

    const increaseDate = () => {
        let nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        setDate(nextDate);
    }

    return <Bookings decreaseDate={decreaseDate} increaseDate={increaseDate} date={date} />
}

export default BookingsContainer;