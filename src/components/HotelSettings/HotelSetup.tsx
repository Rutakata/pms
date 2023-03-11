import React, { useState } from 'react';
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';


type FormValues = {
    hotelName: string, 
    generalRoomsNumber: number
}

const HotelSetup = () => {
    const [formValues, setFormValues] = useState<FormValues>({hotelName: '', generalRoomsNumber: 0});
    const [error, setError] = useState<string | null>(null);
    const handleFormValues = (e: {target: HTMLInputElement}) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        
        if (formValues.hotelName.length < 4) {
            setError('Hotel name must be 4 or more characters');
        }else if (formValues.generalRoomsNumber < 1) {
            setError('Minimum number of rooms is 1');
        }else {
            setError(null);
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
            
            <Form.Group className='d-flex justify-content-end' >
                <Link to='/roomtypessetup'>
                    <Button variant="primary" type="submit">Next</Button>
                </Link>
            </Form.Group>
        </Form>

    </Container>
}

export default HotelSetup;