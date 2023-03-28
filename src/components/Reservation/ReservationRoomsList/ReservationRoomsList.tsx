import { Container } from "react-bootstrap"
import ReservationRoomsListItem from "./ReservationRoomsListItem"


type Props = {
    roomTypes: {[key: string]: {
        peopleNumber: number, 
        roomsQuantity: number,
        roomsReserved: number[]
    }}
}

const ReservationRoomsList = ({roomTypes}: Props) => {    
    return <Container className="border p-3">
        <h4>Reservation Rooms</h4>
        <div>
            {Object.keys(roomTypes).map(roomType => <ReservationRoomsListItem roomType={roomType} rooms={roomTypes[roomType].roomsReserved} />)}
        </div>
        
    </Container>
}

export default ReservationRoomsList;