import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';


type TypeData = {
    typeName: string,
    roomsNumber: number,
}

type Props = {
    deleteButton: boolean,
    id: string,
    deleteTypeField?: (key: string) => void
}

const TypeField = ({deleteButton, id, deleteTypeField}: Props) => {
    const [typeData, setTypeData] = useState<TypeData>({typeName: '', roomsNumber: 1});

    const handleTypeData = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeData({...typeData, [e.target.name]: e.target.value});
    }

    const handleDeletion = () => {
        if (deleteTypeField) {
            deleteTypeField(id);
        }
    }

    return (
        <Form.Group className='d-flex justify-content-between align-items-center mb-3 row'>
            <Container className='col-7 m-0'>
                <Form.Label>Room type</Form.Label>
                <Form.Control type='text' name='typeName' value={typeData.typeName} onChange={handleTypeData} placeholder='Enter room type'/>
            </Container>
            <Container className='col-3'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' name='roomsNumber' value={typeData.roomsNumber} onChange={handleTypeData} min={1} style={{width: '60px'}}/>
            </Container>
            { deleteButton &&
                <Container className='col-2 d-flex align-items-start'>
                    <Button className='d-flex justify-content-center align-items-center' onClick={handleDeletion}>
                        <AiFillDelete size={20} />
                    </Button>
                </Container>
            }
        </Form.Group>
    )
}

export default TypeField;

