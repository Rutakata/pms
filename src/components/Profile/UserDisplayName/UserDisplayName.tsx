import { User } from 'firebase/auth';
import { ChangeEvent } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { BsArrowReturnLeft } from 'react-icons/bs';


type Props = {
    currentUser: User,
    editMode: boolean,
    userName: string,
    handleUserName: (e: ChangeEvent<HTMLInputElement>) => void,
    handleEditMode: () => void,
    updateUsername: () => void
}

const UserDisplayName = ({currentUser, editMode, userName, handleUserName, handleEditMode, updateUsername}: Props) => {
    return <Container className='px-0'>
        {
            editMode ? 
            <Container className='d-flex flex-column gap-1 mx-0 px-0 my-2' style={{maxWidth: '300px'}}>
                <Form.Label className='mb-0'>Enter your name and surname</Form.Label>
                <Form.Control type='text' value={userName} name='username' min={4} onChange={handleUserName} />
                <Container className='d-flex justify-content-between px-0'>
                    <Button className="d-flex align-items-center" onClick={handleEditMode}>
                        <BsArrowReturnLeft size={20} />
                    </Button>
                    <Button className="d-flex align-items-center" 
                            onClick={updateUsername}
                            disabled={userName.length <= 4}>
                        <AiOutlineSave size={20} />
                    </Button>
                </Container>
            </Container> :
            <Container className='d-flex gap-2 align-items-center px-0'>
                <h4 className='m-0'>{currentUser.displayName || 'You have not set name yet'}</h4>
                <Button className="d-flex align-items-center" onClick={handleEditMode}>
                    <AiOutlineEdit size={20} />
                </Button>
            </Container>
        }
    </Container>
}

export default UserDisplayName;