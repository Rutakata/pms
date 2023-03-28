import { User } from "firebase/auth"
import { Button, Container } from "react-bootstrap"
import { BiUserCircle } from 'react-icons/bi';


type Props = {
    currentUser: User,
    logOut: () => Promise<void>
}

const Profile = ({currentUser, logOut}: Props) => {
    return <Container className="mt-3">
        <Container>
        {
            currentUser.photoURL ? 
            <img src={currentUser.photoURL} width='100px' height='100px'/> :
            <BiUserCircle size={100} />
        }
        </Container>
        <Button onClick={logOut}>Log out</Button>
    </Container>
}

export default Profile;