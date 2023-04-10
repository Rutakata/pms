import { useState, useEffect } from 'react';
import { Button, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCleaningSchedule } from '../../store/cleaningReducer';
import CleaningScheduleModalContainer from './CleaningScheduleModal/CleaningScheduleModalContainer';
import CleaningTableContainer from './CleaningTable/CleaningTableContainer';


const CleaningContainer = () => {
    const [show, setShow] = useState<boolean>(false);
    const { loading, cleaningId } = useAppSelector(state => state.cleaningReducer);
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCleaningSchedule(hotelId));
    }, [hotelId, cleaningId])

    const handleModalShow = () => {
        setShow(!show);
    }
    
    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }else if (!loading && !cleaningId) {
        return <Container className='mt-3' style={{height: '100vh'}}>
            <h2>You have not created cleaning schedule yet</h2>
            <Button onClick={handleModalShow}>Create schedule</Button>
            <CleaningScheduleModalContainer show={show} handleModalShow={handleModalShow} />
        </Container>
    }else if (!loading && cleaningId) {
        return <CleaningTableContainer />
    }
}

export default CleaningContainer;