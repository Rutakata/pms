import { ChangeEvent } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { changeClientName, changeClientPhone, changeClientSurname, createReservation } from '../../../store/reservationReducer';


type Props= {
    show: boolean,
    handleShow: () => void
}

const ClientDetails = ({show, handleShow}: Props) => {
    const { client, arrival, departure, note, roomTypes } = useAppSelector(state => state.reservationReducer);
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    const handleReservationCreation = () => {
        Object.keys(roomTypes).forEach(key => {
            if (roomTypes[key].roomsReserved.length > 0) {
                roomTypes[key].roomsReserved.map((roomNumber) => {
                    dispatch(createReservation({
                        hotelId, 
                        arrival, 
                        departure, 
                        client, 
                        note, 
                        peopleNumber: roomTypes[key].peopleNumber,
                        roomNumber: roomNumber.toString(),
                        roomType: key
                    }));
                })
                
            }
            
        })
        
    }

    const handleClientName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeClientName(e.target.value));
    }

    const handleClientSurname = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeClientSurname(e.target.value));
    }

    const handleClientPhone = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeClientPhone(e.target.value));
    }

    return <Modal show={show} onHide={handleShow}>
        <Modal.Dialog style={{width: '100%', margin: '0'}}>
            <Modal.Header closeButton>
                <Modal.Title>Client Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group>
                        <Form.Label>Client name</Form.Label>
                        <Form.Control type='text' name="name" value={client.name} onChange={handleClientName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Client surname</Form.Label>
                        <Form.Control type='text' name="surname" value={client.surname} onChange={handleClientSurname} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Client phone number</Form.Label>
                        <Form.Control type='text' name='phone' value={client.phone} onChange={handleClientPhone} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>Close</Button>
                <Button variant="primary" onClick={handleReservationCreation}>Create reservation</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>
}

export default ClientDetails;