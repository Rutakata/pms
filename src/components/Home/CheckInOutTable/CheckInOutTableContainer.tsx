import { useEffect, useState } from 'react';
import { useAppSelector } from "../../../hooks";
import { RoomReservation } from '../../../store/hotelReducer';
import CheckInTable from './CheckInOutTable';


type Props = {
    isCheckOut: boolean
}

const CheckInTableCotnainer = ({isCheckOut}: Props) => {
    const {roomTypes} = useAppSelector(state => state.hotelReducer);
    const [todayReservations, setTodalReservations] = useState<{[key: string]: RoomReservation}>({});

    useEffect(() => {
        let filtered: {[key: string]: RoomReservation} = {};
        let date = isCheckOut ? 'departure' : 'arrival';

        Object.keys(roomTypes).map(roomType => {
            Object.keys(roomTypes[roomType].rooms).map(roomNumber => {
                roomTypes[roomType].rooms[roomNumber].map((reservation: RoomReservation) => {
                    if (reservation[date as keyof RoomReservation] === new Date().toISOString().slice(0, 10)) {
                        filtered[roomNumber] = reservation;
                    }
                })
            })
        }) 

        setTodalReservations(filtered);
    }, [roomTypes])
    return <CheckInTable todayReservations={todayReservations} isCheckOut={isCheckOut}/>
}

export default CheckInTableCotnainer;