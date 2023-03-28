import { Container } from "react-bootstrap"
import ReservationRoomsListItem from "./ReservationRoomsListItem"


type Props = {
    roomTypes: {[key: string]: {
        peopleNumber: number,
        roomsReserved: number[]
    }},
    handleRoomBadgeClick: () => void
}

const ReservationRoomsList = ({roomTypes, handleRoomBadgeClick}: Props) => {    
    return <Container className="border p-3" style={{width: '250px'}}>
        <h4 className="border-bottom pb-1">Reservation Rooms</h4>
        <div>
            {Object.keys(roomTypes).map(roomType => <ReservationRoomsListItem roomType={roomType} 
                                                                              rooms={roomTypes[roomType].roomsReserved}
                                                                              handleRoomBadgeClick={handleRoomBadgeClick} />)}
        </div>
        
    </Container>
}

export default ReservationRoomsList;