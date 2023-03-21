import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { RoomType } from "../../store/hotelReducer";
import RoomTypeFilterItem from "./RoomTypeFilterItem";
import TableRow from "./TableRow";


type Props = {
    arrival: string, 
    departure: string,
    roomTypes: {[key: string]: RoomType},
    handleArrivalDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDepartureDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: (e: FormEvent<HTMLFormElement> ) => void
}

const Reservation = ({arrival, departure, roomTypes, handleArrivalDate, handleDepartureDate, handleSearch}: Props) => {
    return <Container style={{minHeight: '100vh'}} className='mt-3 d-flex flex-column'>
        <Form className="d-flex" onSubmit={handleSearch}>
            <Container className="d-flex gap-3">
                <Form.Group>
                    <Form.Label>Check-In</Form.Label>
                    <Form.Control type='date' value={arrival} onChange={handleArrivalDate} min={new Date().toISOString().split("T")[0]} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Check-Out</Form.Label>
                    <Form.Control type='date' value={departure} onChange={handleDepartureDate} />
                </Form.Group>
            </Container>
            <Form.Group className="d-flex flex-column align-self-end">
                <Button type='submit' className="d-flex align-items-center gap-1">
                    <BiSearch size={20}/>
                    Search
                </Button>
            </Form.Group>
        </Form>
        <Container className="mt-4">
            <Form className="d-flex gap-3">
                {
                    Object.keys(roomTypes).map(roomType => <RoomTypeFilterItem roomType={roomType} key={roomType} />)
                }
            </Form>
        </Container>
        <Container className="mt-3">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Room type</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>People</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(roomTypes).map((roomType, index) => <TableRow id={index+1} 
                                                                                  key={roomType}
                                                                                  roomType={roomType} 
                                                                                  price={roomTypes[roomType].price}
                                                                                  available={Object.keys(roomTypes[roomType].rooms).length} />)
                    }
                </tbody>
            </Table>
        </Container>
    </Container> 
}

export default Reservation;