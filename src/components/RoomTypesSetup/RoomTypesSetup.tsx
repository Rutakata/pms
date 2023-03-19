import { FormEvent } from 'react';
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks';
import TypeField from './TypeField';


const RoomTypesSetup = () => {
    const { roomTypes, currentRoomType, generalRoomsNumber,error } = useAppSelector(state => state.hotelReducer);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/roomsassignment');
    }

    return <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Form className='border p-3' onSubmit={handleSubmit}>
            <h1>Room Types</h1>
            <TypeField roomTypeName={currentRoomType.roomTypeName} roomsNumber={currentRoomType.roomsNumber} isDeletable={false} />
            {error && <Alert variant="danger">{error}</Alert>} 
            {Object.keys(roomTypes).map(roomTypesKey => <TypeField roomTypeName={roomTypesKey} 
                                                                   roomsNumber={roomTypes[roomTypesKey].roomsNumber}
                                                                   isDeletable={true} />)}
            {/* <Form.Group>
                <h3>Rooms assigned: {`${Object.keys(roomTypes).reduce((acc, roomTypesKey) => acc += roomTypes[roomTypesKey].roomsNumber)}/${generalRoomsNumber}`}</h3>
            </Form.Group> */}
            <Form.Group className='d-flex justify-content-between'>
                <Button variant="primary" onClick={() => navigate('/setup')}>Back</Button>
                <Button variant="primary" type="submit">Next</Button>
            </Form.Group>
        </Form>
    </Container>
}

export default RoomTypesSetup;