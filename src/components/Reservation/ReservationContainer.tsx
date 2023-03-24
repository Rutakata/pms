import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchRooms } from '../../store/hotelReducer';
import { setRoomTypesFilter, updateArrivalDate, updateDepartureDate, updateRoomTypeFilter } from '../../store/reservationReducer';
import Reservation from './Reservation';


const ReservationContainer = () => {
    const { arrival, departure } = useAppSelector(state => state.reservationReducer);
    const { roomTypes, filteredRooms } = useAppSelector(state => state.hotelReducer);
    const { filters } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoomTypesFilter(Object.keys(roomTypes)));
    }, [])

    useEffect(() => {
        dispatch(searchRooms({arrival, departure, roomTypes: filters.roomTypes}));
    }, [])

    const handleArrivalDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateArrivalDate(e.target.value));
    }

    const handleDepartureDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDepartureDate(e.target.value));
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(searchRooms({arrival, departure, roomTypes: filters.roomTypes}));
    }

    return <Reservation arrival={arrival} 
                        departure={departure} 
                        roomTypes={filteredRooms}
                        handleArrivalDate={handleArrivalDate}
                        handleDepartureDate={handleDepartureDate}
                        handleSearch={handleSearch} />
}

export default ReservationContainer;