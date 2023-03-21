import { useState, useEffect, ChangeEvent } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";


const Booking = () => {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    
    useEffect(() => {
        console.log(arrivalDate);
        console.log(departureDate); 
    }, [arrivalDate, departureDate])

    return <Container style={{minHeight: '100vh'}} className='mt-3 d-flex flex-column'>
        <Form className="d-flex">
            <Container className="d-flex gap-3">
                <Form.Group>
                    <Form.Label>Check-In</Form.Label>
                    <Form.Control type='date' value={arrivalDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setArrivalDate(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Check-Out</Form.Label>
                    <Form.Control type='date' value={departureDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartureDate(e.target.value)} />
                </Form.Group>
            </Container>
            <Form.Group className="d-flex flex-column align-self-end">
                <Button type='submit' className="d-flex align-items-center gap-1">
                    <BiSearch size={20}/>
                    Search
                </Button>
            </Form.Group>
        </Form>
        <Container className="mt-3">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Room type</th>
                        <th>Price</th>
                        <th>People</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
            </Table>
        </Container>
    </Container> 
}

export default Booking;