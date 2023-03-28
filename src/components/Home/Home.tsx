import { Container } from "react-bootstrap"
import CheckInTableCotnainer from "./CheckInTable/CheckInTableContainer";

const Home = () => {
    return <Container style={{minHeight: '100vh'}} className='mt-3'>
        <Container>
            <h4>Today's reservations</h4>
            <CheckInTableCotnainer />
        </Container>
    </Container>
}

export default Home;