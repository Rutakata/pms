import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchRooms } from '../../store/hotelReducer';
import { setRoomTypes, setRoomTypesFilter, updateArrivalDate, updateDepartureDate, updateRoomTypeFilter } from '../../store/reservationReducer';
import Reservation from './Reservation';


const ReservationContainer = () => {
    const { arrival, departure, filters } = useAppSelector(state => state.reservationReducer);
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoomTypesFilter(Object.keys(roomTypes)));
    }, [roomTypes])

    useEffect(() => {
        dispatch(setRoomTypes(Object.keys(roomTypes)));
    }, [roomTypes])

    return <Reservation arrival={arrival} departure={departure} />
}

export default ReservationContainer;