import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { BiAddToQueue } from 'react-icons/bi';
import TypeField from './TypeField';


type RoomType = {
    roomType: string,
    roomsNumber: number
}

const RoomTypesSetup = () => {
    const [roomTypes, setRoomTypes] = useState<{ [key: string]: RoomType } | {}>({});

    const typeField = (
        <Form.Group className='d-flex justify-content-between align-items-center mb-3 row'>
                <Container className='col-8 m-0'>
                    <Form.Label>Room type</Form.Label>
                    <Form.Control type='text' placeholder='Enter room type'/>
                </Container>
                <Container className='col-4'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type='number' min={1} style={{width: '60px'}}/>
                </Container>
            </Form.Group>
    )

    return <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Form className='border p-3'>
            <h1>Room Types</h1>
            <TypeField />
            <Form.Group>
                <Button className='d-flex justify-content-center align-items-center'>
                    <BiAddToQueue size={20}/>
                </Button>
            </Form.Group>
        </Form>
    </Container>
}

export default RoomTypesSetup;