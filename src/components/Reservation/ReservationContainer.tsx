import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchRooms } from '../../store/hotelReducer';
import { updateArrivalDate, updateDepartureDate } from '../../store/reservationReducer';
import Reservation from './Reservation';


const ReservationContainer = () => {
    const {arrival, departure} = useAppSelector(state => state.reservationReducer);
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    const handleArrivalDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateArrivalDate(e.target.value));
    }

    const handleDepartureDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDepartureDate(e.target.value));
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(searchRooms({arrival, departure}));
    }

    return <Reservation arrival={arrival} 
                        departure={departure} 
                        roomTypes={roomTypes}
                        handleArrivalDate={handleArrivalDate}
                        handleDepartureDate={handleDepartureDate}
                        handleSearch={handleSearch} />
}

export default ReservationContainer;