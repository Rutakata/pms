import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { CleaningSchedule, createCleaningSchedule, getCleaners, getCleaningSchedule, setWeekdays } from '../../../store/cleaningReducer';
import CleaningScheduleModal from './CleaningScheduleModal';


type Props = {
    show: boolean, 
    handleModalShow: () => void
}

const CleaningScheduleModalContainer = ({show, handleModalShow}: Props) => {
    const dispatch = useAppDispatch();
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const {newCleaningSchedule} = useAppSelector(state => state.cleaningReducer);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        dispatch(getCleaners(hotelId));
        dispatch(setWeekdays(weekdays));
    }, [])

    const handleCleaningScheduleCreation = () => {
        dispatch(createCleaningSchedule({hotelId, newCleaningSchedule}));
    }

    return <CleaningScheduleModal show={show} 
                                  weekdays={weekdays} 
                                  handleModalShow={handleModalShow}
                                  handleCleaningScheduleCreation={handleCleaningScheduleCreation} />
}

export default CleaningScheduleModalContainer;