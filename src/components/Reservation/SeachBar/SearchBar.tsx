import { FormEvent, ChangeEvent } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";


type Props = {
    arrival: string,
    departure: string,
    disabledSearch: boolean,
    handleArrivalDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDepartureDate: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: (e: FormEvent<HTMLFormElement> ) => void,
}

const SearchBar = ({arrival, departure, disabledSearch, handleArrivalDate, handleDepartureDate, handleSearch}: Props) => {
    return <Form className="d-flex" onSubmit={handleSearch}>
        <Container className="d-flex gap-3">
            <Form.Group>
                <Form.Label>Check-In</Form.Label>
                <Form.Control type='date' value={arrival} onChange={handleArrivalDate} min={new Date().toISOString().split("T")[0]} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Check-Out</Form.Label>
                <Form.Control type='date' value={departure} onChange={handleDepartureDate} min={new Date().toISOString().split("T")[0]} />
            </Form.Group>
        </Container>
        <Form.Group className="d-flex flex-column align-self-end">
            <Button type='submit' className="d-flex align-items-center gap-1" disabled={disabledSearch}>
                <BiSearch size={20}/>Search
            </Button>
        </Form.Group>
    </Form>
}

export default SearchBar;