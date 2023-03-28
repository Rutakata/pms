import { useAppSelector } from "../../../hooks";
import ReservationRoomsList from "./ReservationRoomsList";


const ReservationRoomsListContainer = () => {
    const { roomTypes } = useAppSelector(state => state.reservationReducer);
    
    return <ReservationRoomsList roomTypes={roomTypes} />
}

export default ReservationRoomsListContainer;