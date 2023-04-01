import { Accordion, ListGroup } from "react-bootstrap";
import { RoomReservation } from "../../../store/hotelReducer";


type Props = {
    roomTypeName: string,
    index: string,
    rooms: { [key: string]: RoomReservation },
    currentDate: string
}

const AccordionItem = ({roomTypeName, index, rooms, currentDate}: Props) => {
    return <Accordion.Item eventKey={index}>
        <Accordion.Header>{roomTypeName}</Accordion.Header>
        <Accordion.Body>
            <ListGroup>
            {
                Object.keys(rooms).length > 0 ? 
                Object.keys(rooms).map(roomNumber => (
                    <ListGroup.Item variant={rooms[roomNumber].arrival === currentDate ? 'primary' :
                                            rooms[roomNumber].departure === currentDate ? 'danger': 'success'}>
                        {roomNumber}
                    </ListGroup.Item>
                )) :
                'All rooms of this type are available on this date'
            }
            </ListGroup>
        </Accordion.Body>
    </Accordion.Item>
}

export default AccordionItem;