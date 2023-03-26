import { ChangeEvent, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { searchRooms } from '../../../store/hotelReducer';
import { addRoomToReservation, changePeopleNumber, changeRoomsQuantity } from '../../../store/reservationReducer';
import RoomsTable from './RoomsTable';


type Props = {
    arrival: string,
    departure: string,
}

const RoomsTableContainer = ({ arrival, departure }: Props) => {
    const { filteredRooms } = useAppSelector(state => state.hotelReducer);
    const { filters, roomTypes } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    const handlePeopleNumber = (e: ChangeEvent<HTMLInputElement>, roomType: string) => {
        dispatch(changePeopleNumber({roomType, peopleNumber: e.target.value}));
    }

    const handleRoomsQuantity = (e: ChangeEvent<HTMLInputElement>, roomType: string) => {
        dispatch(changeRoomsQuantity({roomType, roomsQuantity: e.target.value}));
    }

    const handleRoomReservation = (roomType: string) => {
        dispatch(addRoomToReservation({roomType, roomNumber: Object.keys(filteredRooms[roomType].rooms)[0]}));
    }

    useEffect(() => {
        dispatch(searchRooms({arrival, departure, roomTypes: filters.roomTypes}));
    }, [])

    return <RoomsTable filteredRooms={filteredRooms} 
                       roomTypes={roomTypes}
                       handlePeopleNumber={handlePeopleNumber}
                       handleRoomsQuantity={handleRoomsQuantity}
                       handleRoomReservation={handleRoomReservation} />
}

export default RoomsTableContainer;