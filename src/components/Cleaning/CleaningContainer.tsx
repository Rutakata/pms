import { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CleaningScheduleModal from './CleaningScheduleModal';


const CleaningContainer = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleModalShow = () => {
        setShow(!show);
    }

    return <Container className='mt-3' style={{height: '100vh'}}>
        <Button onClick={handleModalShow}>Create schedule</Button>
        <CleaningScheduleModal show={show} handleModalShow={handleModalShow} />
    </Container>
}

export default CleaningContainer;