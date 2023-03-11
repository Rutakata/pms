import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';


type TypeData = {
    typeName: string,
    roomsNumber: number
}

const TypeField = () => {
    const [typeData, setTypeData] = useState<TypeData>({typeName: '', roomsNumber: 1});

    const handleTypeData = (e: {target: HTMLInputElement}) => {
        setTypeData({...typeData, [e.target.name]: e.target.value});
    }

    return (
        <Form.Group className='d-flex justify-content-between align-items-center mb-3 row'>
            <Container className='col-8 m-0'>
                <Form.Label>Room type</Form.Label>
                <Form.Control type='text' name='typeName' value={typeData.typeName} onChange={handleTypeData} placeholder='Enter room type'/>
            </Container>
            <Container className='col-4'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' name='roomsNumber' value={typeData.roomsNumber} onChange={handleTypeData} min={1} style={{width: '60px'}}/>
            </Container>
        </Form.Group>
    )
}

export default TypeField;

