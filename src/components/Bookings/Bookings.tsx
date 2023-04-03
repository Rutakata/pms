import { Alert, Button, Container } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import RoomsStateContainer from "./RoomsState/RoomsStateContainer";


type Props = {
    date: Date,
    decreaseDate: () => void,
    increaseDate: () => void
}

const Bookings = ({date, decreaseDate, increaseDate}: Props) => {
    const currentDate = date.toISOString().slice(0, 10);

    return <Container style={{height: '100vh'}} className='mt-3'>
        <Container className="d-flex gap-2 align-items-center justify-content-center">
            <Button variant="outline-primary" 
                    className="d-flex align-items-center"
                    onClick={decreaseDate}>
                <AiOutlineArrowLeft size={20}/>
            </Button>
            <h5 className="m-0">{currentDate}</h5>
            <Button variant="outline-primary" 
                    className="d-flex align-items-center"
                    onClick={increaseDate}>
                <AiOutlineArrowRight size={20}/>
            </Button>
        </Container>
        <Container className="d-flex gap-3 mt-2" style={{height: "40px"}}>
            <Alert variant="primary" className="d-flex align-items-center">Arrival</Alert>
            <Alert variant="success" className="d-flex align-items-center">Living</Alert>
            <Alert variant="danger" className="d-flex align-items-center">Departure</Alert>
        </Container>
        <RoomsStateContainer currentDate={currentDate} />
    </Container>
}

export default Bookings;