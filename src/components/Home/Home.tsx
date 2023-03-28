import { Container } from "react-bootstrap"
import CheckInTableCotnainer from "./CheckInOutTable/CheckInOutTableContainer";

const Home = () => {
    return <Container style={{minHeight: '100vh'}} className='mt-3'>
        <Container className="d-flex gap-3">
            <Container>
                <h4>Today's arrivals</h4>
                <CheckInTableCotnainer isCheckOut={false} />
            </Container>
            <Container>
                <h4>Today's departures</h4>
                <CheckInTableCotnainer isCheckOut />
            </Container>
        </Container>
    </Container>
}

export default Home;