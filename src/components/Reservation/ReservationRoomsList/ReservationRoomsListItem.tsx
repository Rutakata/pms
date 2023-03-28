import { Badge, Container } from "react-bootstrap"

type Props = {
    roomType: string,
    rooms: number[]
}

const ReservationRoomsListItem = ({roomType, rooms}: Props) => {
    return <Container className="mt-3">
        <h5>{roomType}</h5>
        <div className="d-flex flex-wrap gap-1">
            {
                rooms.length > 0 ? 
                rooms.map(room => <Badge>{room}</Badge>) :
                <span>No rooms</span>
            }
        </div>
    </Container>
}

export default ReservationRoomsListItem;