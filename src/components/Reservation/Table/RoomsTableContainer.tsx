import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { searchRooms } from '../../../store/hotelReducer';
import RoomsTable from './RoomsTable';


type Props = {
    arrival: string,
    departure: string,
}

const RoomsTableContainer = ({ arrival, departure }: Props) => {
    const { filteredRooms } = useAppSelector(state => state.hotelReducer);
    const { filters } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchRooms({arrival, departure, roomTypes: filters.roomTypes}));
    }, [])

    return <RoomsTable filteredRooms={filteredRooms} />
}

export default RoomsTableContainer;