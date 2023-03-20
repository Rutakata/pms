import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useAppDispatch } from '../../hooks';
import {updateCurrentRoomTypeName, updateCurrentRoomTypeNumber, updateCurrentRoomTypePrice, createRoomType, deleteRoomType } from '../../store/hotelReducer';


type Props = {
    roomTypeName: string,
    roomsNumber: number,
    isDeletable: boolean,
    generalRoomsNumber?: number,
    roomsUsed?: number,
    price: number
}

const TypeField = ({roomTypeName, roomsNumber, isDeletable, generalRoomsNumber, roomsUsed, price}: Props) => {
    const dispatch = useAppDispatch();

    const handleNameField = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentRoomTypeName(e.target.value));
    }

    const handleNumberField = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentRoomTypeNumber(e.target.value));
    }

    const handlePriceField = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentRoomTypePrice(e.target.value));
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
            <Container className='col-4 m-0'>
                <Form.Label>Room type</Form.Label>
                <Form.Control type='text' 
                              name='typeName' 
                              onChange={handleNameField} 
                              value={roomTypeName} 
                              disabled={isDeletable} 
                              placeholder='Enter room type'/>
            </Container>
            <Container className='col-3 d-flex flex-column align-items-center'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' 
                              name='roomsNumber' 
                              onChange={handleNumberField} 
                              value={roomsNumber} 
                              disabled={isDeletable} 
                              min={1} 
                              style={{width: '60px'}}/>
            </Container>
            <Container className='col-3 d-flex flex-column align-items-center'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' 
                              name='price'
                              onChange={handlePriceField} 
                              value={price}
                              disabled={isDeletable} 
                              min={1} 
                              style={{width: '80px'}}/>
            </Container>
            {isDeletable ? 
            <Container className='col-2 d-flex align-self-end'>
                <Button className='d-flex justify-content-center align-items-center' onClick={handleRoomTypeDeletion}>
                    <AiFillDelete size={20} />
                </Button>
            </Container> 
            : 
            <Container className='col-2 d-flex align-self-end'>
                <Button className='d-flex justify-content-center align-items-center' onClick={handleRoomTypeCreation}>
                    <IoMdAddCircleOutline size={20} />
                </Button>
            </Container>}
        </Form.Group>
    )
}

export default TypeField;

