import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useAppDispatch } from '../../hooks';
import {updateCurrentRoomTypeName, updateCurrentRoomTypeNumber, createRoomType, deleteRoomType } from '../../store/hotelReducer';


type Props = {
    roomTypeName: string,
    roomsNumber: number,
    isDeletable: boolean,
    generalRoomsNumber?: number,
    roomsUsed?: number
}

const TypeField = ({roomTypeName, roomsNumber, isDeletable, generalRoomsNumber, roomsUsed}: Props) => {
    const dispatch = useAppDispatch();

    const handleNameField = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentRoomTypeName(e.target.value));
    }

    const handleNumberField = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentRoomTypeNumber(e.target.value));
    }

    const handleRoomTypeCreation = () => {
        if (roomsNumber > 0 && typeof generalRoomsNumber === 'number' && roomsNumber <= generalRoomsNumber) {
            if (typeof roomsUsed === 'number' && roomsUsed+roomsNumber <= generalRoomsNumber) {
                dispatch(createRoomType());
            }
        }
    }

    const handleRoomTypeDeletion = () => {
        dispatch(deleteRoomType(roomTypeName));
    }

    return (
        <Form.Group className='d-flex justify-content-between align-items-center mb-3 row'>
            <Container className='col-7 m-0'>
                <Form.Label>Room type</Form.Label>
                <Form.Control type='text' name='typeName' onChange={handleNameField} value={roomTypeName} disabled={isDeletable} placeholder='Enter room type'/>
            </Container>
            <Container className='col-3'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' name='roomsNumber' onChange={handleNumberField} 
                              value={roomsNumber} min={1} 
                              style={{width: '60px'}}/>
            </Container>
            {isDeletable ? 
            <Container className='col-2 d-flex align-items-start'>
                <Button className='d-flex justify-content-center align-items-center' onClick={handleRoomTypeDeletion}>
                    <AiFillDelete size={20} />
                </Button>
            </Container> 
            : 
            <Container className='col-2 d-flex align-items-start'>
                <Button className='d-flex justify-content-center align-items-center' onClick={handleRoomTypeCreation}>
                    <IoMdAddCircleOutline size={20} />
                </Button>
            </Container>}
        </Form.Group>
    )
}

export default TypeField;

