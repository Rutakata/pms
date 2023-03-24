import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { RoomType } from "../../store/hotelReducer";
import ClientDetails from "./ClientDetails/ClientDetails";
import RoomTypeFilter from "./RoomTypeFilter/RoomTypeFilter";
import RoomsTableContainer from "./Table/RoomsTableContainer";
import TableRow from "./TableRow";


type Props = {
    arrival: string, 
    departure: string,
    roomTypes: {[key: string]: RoomType},
    handleArrivalDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDepartureDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: (e: FormEvent<HTMLFormElement> ) => void,
}

const Reservation = ({arrival, departure, roomTypes, handleArrivalDate, handleDepartureDate, handleSearch}: Props) => {
    const [show, setShow] = useState<boolean>(false);

    const handleShow = () => {setShow(!show)};

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
                    <BiSearch size={20}/>Search
                </Button>
            </Form.Group>
        </Form>
        <Container className="mt-4">
            <RoomTypeFilter />
        </Container>
        <Container className="mt-3">
            <RoomsTableContainer arrival={arrival} departure={departure} />
        </Container>
        <Container>
            <Button onClick={handleShow}>Add client info</Button>
        </Container>
        <ClientDetails show={show} handleShow={handleShow} />
    </Container> 
}

export default Reservation;