import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { RoomType } from "../../store/hotelReducer";
import ClientDetails from "./ClientDetails/ClientDetails";
import PriceContainer from "./Price/PriceContainer";
import ReservationRoomsListContainer from "./ReservationRoomsList/ReservationRoomsLIstContainer";
import RoomTypeFilter from "./RoomTypeFilter/RoomTypeFilter";
import SearchBarContainer from "./SeachBar/SearchBarContainer";
import RoomsTableContainer from "./Table/RoomsTableContainer";


type Props = {
    arrival: string, 
    departure: string,
}

const Reservation = ({arrival, departure }: Props) => {
    const [show, setShow] = useState<boolean>(false);

    const handleShow = () => {setShow(!show)};

    return <Container style={{minHeight: '100vh'}} className='mt-3 d-flex flex-column'>
        <SearchBarContainer />
        <Container className="mt-4">
            <RoomTypeFilter />
        </Container>
        <Container className="mt-3 d-flex gap-3">
            <ReservationRoomsListContainer />
            <RoomsTableContainer />
        </Container>
        <Container className="d-flex justify-content-between mt-3 align-items-center">
            <PriceContainer />
            <Button onClick={handleShow} style={{width: '150px'}}>Add client info</Button>
        </Container>
        <ClientDetails show={show} handleShow={handleShow} />
    </Container> 
}

export default Reservation;