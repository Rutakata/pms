import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCleaners, setWeekdays } from '../../../store/cleaningReducer';
import CleaningScheduleModal from './CleaningScheduleModal';


type Props = {
    show: boolean, 
    handleModalShow: () => void
}

const CleaningScheduleModalContainer = ({show, handleModalShow}: Props) => {
    const dispatch = useAppDispatch();
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        dispatch(getCleaners(hotelId));
        dispatch(setWeekdays(weekdays));
    }, [])

    return <CleaningScheduleModal show={show} weekdays={weekdays} handleModalShow={handleModalShow} />
}

export default CleaningScheduleModalContainer;