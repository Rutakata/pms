import { useState, ChangeEvent } from 'react';
import { Accordion, Form, Button, Badge, Container } from "react-bootstrap";
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
    const [roomNumber, setRoomNumber] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleRoomNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^(\d+|\d+-\d+)$/.test(e.target.value)) {
            setRoomNumber(e.target.value);
        }
    }

    const handleRoomAssignment = () => {
        if (roomNumber.includes('-')) {
            let leftLimit = Number(roomNumber.slice(0, roomNumber.indexOf('-')));
            let rightLimit = Number(roomNumber.slice(roomNumber.indexOf('-')+1));

            if (Object.keys(rooms).length + (Math.abs(rightLimit - leftLimit)+1) <= roomsNumber) {
                if (leftLimit < rightLimit) {
                    for (let i = leftLimit; i <= rightLimit; i++) {
                        dispatch(assignRoom({roomTypeName, roomNumber: i}));
                    }
                }else {
                    for (let i = rightLimit; i <= leftLimit; i++) {
                        dispatch(assignRoom({roomTypeName, roomNumber: i}));
                    }
                }
            }
        }else if (Object.keys(rooms).length+1 <= roomsNumber) {
            dispatch(assignRoom({roomTypeName, roomNumber}));
        }
    }

    return <Accordion.Item eventKey={eventKey.toString()}>
        <Accordion.Header>{roomTypeName}</Accordion.Header>
        <Accordion.Body>
            <p className='d-flex flex-wrap gap-1'>
                {
                Object.keys(rooms).length > 0 ?
                Object.keys(rooms).map(roomNumber => <Badge bg='primary' key={roomNumber}>{roomNumber}</Badge>)
                : null
                }
            </p>
            <p>Rooms assigned: {`${Object.keys(rooms).length}/${roomsNumber}`}</p>
            <Form.Group>
                <Form.Label>Enter room number</Form.Label>
                <Container className='d-flex justify-content-between p-0 gap-3'>
                    <Form.Control type="text" name='roomNumber' value={roomNumber} onChange={handleRoomNumberChange} />
                    <Button className='d-flex justify-content-center align-items-center' 
                            onClick={handleRoomAssignment}>
                        <IoMdAddCircleOutline size={20} />
                    </Button>
                </Container>
                
            </Form.Group>
        </Accordion.Body>
    </Accordion.Item>
}

export default RoomTypeAccordion;