import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getHotelData } from '../../store/hotelReducer';
import Bookings from "./Bookings";


const BookingsContainer = () => {
    const [date, setDate] = useState<Date>(new Date());
    // const { hotelId, loading } = useAppSelector(state => state.hotelReducer);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getHotelData(hotelId));
    // }, []);

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

    // return loading ? 
    //     <div>Loading...</div> :
    return <Bookings decreaseDate={decreaseDate} increaseDate={increaseDate} date={date} />
}

export default BookingsContainer;