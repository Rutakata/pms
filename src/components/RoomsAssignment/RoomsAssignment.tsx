import { FormEvent, useEffect } from 'react';
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks";
import RoomTypeAccordion from "./RoomTypeAccordion";
import { createHotel } from '../../store/hotelReducer';
import { assignHotelId } from '../../store/userReducer';


const RoomsAssignment = () => {
    const { roomTypes, hotelName, owner, generalRoomsNumber, loading, error, hotelId } = useAppSelector(state =>  state.hotelReducer);
    const { userId } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmition = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createHotel({hotelName, owner, generalRoomsNumber, roomTypes}));
    }

    useEffect(() => {
        if (hotelId.length > 0) {
            dispatch(assignHotelId({hotelId, userId}));
            navigate('/home');
        }
    }, [hotelId])

    return <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Form className="border p-3" style={{width: '500px'}} onSubmit={handleSubmition}>
            <h1>Rooms assignment</h1>
            <Form.Group className="mt-3">
                <Accordion defaultActiveKey='0'>
                    {Object.keys(roomTypes).map(
                        (roomTypesKey, index) => <RoomTypeAccordion eventKey={index} 
                                                                    roomTypeName={roomTypesKey} 
                                                                    roomsNumber={roomTypes[roomTypesKey].roomsNumber}
                                                                    rooms={roomTypes[roomTypesKey].rooms} />
                    )}
                </Accordion>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mt-3">
                <Button variant='primary' onClick={() => navigate(-1)}>Back</Button>
                <Button variant='primary' type='submit' disabled={loading}>Next</Button>
            </Form.Group>
        </Form>
    </Container>
}

export default RoomsAssignment;