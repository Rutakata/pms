import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchRooms } from '../../store/hotelReducer';
import { setRoomTypesFilter, updateArrivalDate, updateDepartureDate, updateRoomTypeFilter } from '../../store/reservationReducer';
import Reservation from './Reservation';


const ReservationContainer = () => {
    const {arrival, departure, filters} = useAppSelector(state => state.reservationReducer);
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoomTypesFilter(Object.keys(roomTypes)));
    }, [])

    const handleArrivalDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateArrivalDate(e.target.value));
    }

    const handleDepartureDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDepartureDate(e.target.value));
    }

    const handleRoomTypeCheck = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRoomTypeFilter(e.target.name));
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(searchRooms({arrival, departure}));
    }

    return <Reservation arrival={arrival} 
                        departure={departure} 
                        roomTypes={roomTypes}
                        roomTypesFilter={filters.roomTypes}
                        handleArrivalDate={handleArrivalDate}
                        handleDepartureDate={handleDepartureDate}
                        handleSearch={handleSearch}
                        handleRoomTypeCheck={handleRoomTypeCheck} />
}

export default ReservationContainer;