import { Container } from "react-bootstrap"

const Booking = () => {
    return <Container style={{minHeight: '100vh'}} className='d-flex'>
        <Container>
            <h3 className="text-center">Today's bookings</h3>
        </Container>
        <Container>
            <h3 className="text-center">Create reservation</h3>
        </Container>
    </Container>
}

export default Booking;