import { useState, useEffect } from 'react';
import { Button, Container, Spinner } from "react-bootstrap";
import CleaningScheduleModal from './CleaningScheduleModal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCleaningSchedule } from '../../store/cleaningReducer';


const CleaningContainer = () => {
    const [show, setShow] = useState<boolean>(false);
    const { cleaners, loading, cleaningId } = useAppSelector(state => state.cleaningReducer);
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCleaningSchedule(hotelId));
    }, [hotelId])

    const handleModalShow = () => {
        setShow(!show);
    }
    
    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }else if (!loading && !cleaningId) {
        return <div>Some error has occured</div>
    }
    return <Container className='mt-3' style={{height: '100vh'}}>
        <Button onClick={handleModalShow}>Create schedule</Button>
        <CleaningScheduleModal show={show} handleModalShow={handleModalShow} />
    </Container>
}

export default CleaningContainer;