import { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch } from '../../hooks';
import { updateHotelSetupData } from '../../store/hotelReducer';


type FormValues = {
    hotelName: string, 
    generalRoomsNumber: number
}

const HotelSetup = () => {
    const [formValues, setFormValues] = useState<FormValues>({hotelName: '', generalRoomsNumber: 0});
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formValues.hotelName.length < 4) {
            setError('Hotel name must be 4 or more characters');
        }else if (Number(formValues.generalRoomsNumber) < 1) {
            setError('Minimum number of rooms is 1');
        }else {
            setError(null);
            dispatch(updateHotelSetupData({...formValues, email: currentUser?.email}));
            navigate('/roomsetup');
        }
    }

    return <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <Form className="border p-3" onSubmit={handleSubmit}>
            <h1>Hotel Setup</h1>
            <Form.Group className="mb-3" controlId="formHotelName">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" name="hotelName" value={formValues.hotelName} onChange={handleFormValues} placeholder="Enter hotel name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRoomsNumber">
            <Form.Label>Rooms Number</Form.Label>
            <Form.Control type="number" name="generalRoomsNumber" min={1} value={formValues.generalRoomsNumber} onChange={handleFormValues} placeholder="Enter the number of rooms" />
            </Form.Group>

            {error && <Alert variant='danger'>{error}</Alert>}
            
            <Form.Group className='d-flex justify-content-between'>
                <Button variant="primary" onClick={() => navigate('/login')}>Back</Button>
                <Button variant="primary" type="submit">Next</Button>
            </Form.Group>
        </Form>

    </Container>
}

export default HotelSetup;