import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCleaners } from '../../../store/cleaningReducer';
import CleaningScheduleModal from './CleaningScheduleModal';


type Props = {
    show: boolean, 
    handleModalShow: () => void
}

const CleaningScheduleModalContainer = ({show, handleModalShow}: Props) => {
    const dispatch = useAppDispatch();
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const { cleaners } = useAppSelector(state => state.cleaningReducer)

    useEffect(() => {
        dispatch(getCleaners(hotelId));
    }, [])

    return <CleaningScheduleModal show={show} cleaners={cleaners} handleModalShow={handleModalShow} />
}

export default CleaningScheduleModalContainer;