import { useAppDispatch, useAppSelector } from "../../../hooks";
import { clearReservationRooms } from "../../../store/reservationReducer";
import ReservationRoomsList from "./ReservationRoomsList";


const ReservationRoomsListContainer = () => {
    const { roomTypes } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    const handleRoomBadgeClick = () => {
        dispatch(clearReservationRooms());
    }
    
    return <ReservationRoomsList roomTypes={roomTypes} handleRoomBadgeClick={handleRoomBadgeClick} />
}

export default ReservationRoomsListContainer;