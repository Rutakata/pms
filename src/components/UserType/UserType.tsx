import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const UserType = () => {
    return <Container style={{height: "100vh"}} className='justify-content-center d-flex align-items-center flex-column'>
        <Link to='/signup'>
            <Alert variant='primary'>
                I'm hotel owner {'>'}
            </Alert> 
        </Link>
        <Link to='/login'>
            <Alert variant='primary'>
                I'm hotel worker {'>'}
            </Alert> 
        </Link>
    </Container>
}


export default UserType;