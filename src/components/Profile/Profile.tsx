import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { User } from "firebase/auth";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import UserDisplayNameContainer from './UserDisplayName/UserDisplayNameContainer';


type Props = {
    currentUser: User,
    logOut: () => void
}

const Profile = ({currentUser, logOut}: Props) => {
    return <Container className="mt-3" style={{height: '100vh'}}>
        <Row>
            <Col className='d-flex justify-content-center'>
            {
                currentUser.photoURL ? 
                <img src={currentUser.photoURL} width='100px' height='100px'/> :
                <BiUserCircle size={100} />
            }
            </Col>
            <Col xs={10}>
                <UserDisplayNameContainer currentUser={currentUser} />
                <p className='mt-1'>{currentUser.email}</p>
            </Col>
        </Row>
        <Button onClick={logOut}>Log out</Button>
    </Container>
}

export default Profile;