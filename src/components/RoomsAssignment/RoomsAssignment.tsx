import { FormEvent } from 'react';
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../hooks";
import RoomTypeAccordion from "./RoomTypeAccordion";
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';


const RoomsAssignment = () => {
    const { roomTypes, hotelName, owner, generalRoomsNumber } = useAppSelector(state =>  state.hotelReducer);
    const navigate = useNavigate();

    const handleSubmition = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addDoc(collection(db, 'hotels'), {
            hotelName, 
            owner,
            generalRoomsNumber,
            roomTypes
        })
        .then((docRef) => {
            navigate('/home');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

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
                <Button variant='primary' type='submit'>Next</Button>
            </Form.Group>
        </Form>
    </Container>
}

export default RoomsAssignment;