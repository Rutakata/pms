import { useState, ChangeEvent } from 'react';
import { Accordion, Form, Button } from "react-bootstrap";
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useAppDispatch } from '../../hooks';
import { assignRoom } from '../../store/hotelReducer';


type Props = {
    eventKey: number, 
    roomTypeName: string,
    roomsNumber: number, 
    rooms: { [key: string]: {} }
}

const RoomTypeAccordion = ({eventKey, roomTypeName, roomsNumber, rooms}: Props) => {
    const [roomNumber, setRoomNumber] = useState<number>(1);
    const dispatch = useAppDispatch();

    const handleRoomNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomNumber(Number(e.target.value));
    }

    const handleRoomAssignment = () => {
        dispatch(assignRoom({roomTypeName, roomNumber}))
    }

    return <Accordion.Item eventKey={eventKey.toString()}>
        <Accordion.Header>{roomTypeName}</Accordion.Header>
        <Accordion.Body>
            <p>
                {
                Object.keys(rooms).length > 0 ?
                Object.keys(rooms).map(roomNumber => <span key={roomNumber}>{roomNumber}</span>)
                : "No rooms assigned"
                }
            </p>
            <Form.Group>
                <Form.Label>Enter room number</Form.Label>
                <Form.Control type="text" name='roomNumber' value={roomNumber} onChange={handleRoomNumberChange} />
                <Button className='d-flex justify-content-center align-items-center' onClick={handleRoomAssignment}>
                    <IoMdAddCircleOutline size={20} />
                </Button>
            </Form.Group>
        </Accordion.Body>
    </Accordion.Item>
}

export default RoomTypeAccordion;