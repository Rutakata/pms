import { useEffect, useState } from 'react';
import { useAppSelector } from "../../../hooks";
import { RoomReservation } from '../../../store/hotelReducer';
import CheckInTable from './CheckInTable';

const CheckInTableCotnainer = () => {
    const {roomTypes} = useAppSelector(state => state.hotelReducer);
    const [todayReservations, setTodalReservations] = useState<{[key: string]: RoomReservation}>({});

    useEffect(() => {
        let filtered: {[key: string]: RoomReservation} = {};

        Object.keys(roomTypes).map(roomType => {
            Object.keys(roomTypes[roomType].rooms).map(roomNumber => {
                roomTypes[roomType].rooms[roomNumber].map(reservation => {
                    if (reservation.arrival === new Date().toISOString().slice(0, 10)) {
                        filtered[roomNumber] = reservation;
                    }
                })
            })
        }) 

        setTodalReservations(filtered);
    }, [roomTypes])
    return <CheckInTable todayReservations={todayReservations} />
}

export default CheckInTableCotnainer;