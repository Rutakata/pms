import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { CleaningSchedule, createCleaningSchedule, getCleaners, getCleaningSchedule, setWeekdays } from '../../../store/cleaningReducer';
import CleaningScheduleModal from './CleaningScheduleModal';
import { Container, Spinner } from 'react-bootstrap';


type Props = {
    show: boolean, 
    handleModalShow: () => void
}

const CleaningScheduleModalContainer = ({show, handleModalShow}: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const { cleaningId, newCleaningSchedule } = useAppSelector(state => state.cleaningReducer);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        dispatch(getCleaners(hotelId));
        dispatch(setWeekdays(weekdays));
    }, [])

    const handleCleaningScheduleCreation = () => {
        setLoading(true);
        dispatch(createCleaningSchedule({hotelId, cleaningId, newCleaningSchedule})).then(res => {
            dispatch(setWeekdays(weekdays));
        }).then(res => {
            dispatch(getCleaningSchedule(hotelId));
        }).then(res => {
            setLoading(false);
            handleModalShow();
        })
    }

    if (loading) {
        return <Container className='mt-3' style={{ minHeight: '100vh' }}>
            <Spinner animation="border" role="status" className='mx-auto'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
      </Container>
    }else {
        return <CleaningScheduleModal show={show} 
                                  weekdays={weekdays} 
                                  handleModalShow={handleModalShow}
                                  handleCleaningScheduleCreation={handleCleaningScheduleCreation} />
    }  
}

export default CleaningScheduleModalContainer;