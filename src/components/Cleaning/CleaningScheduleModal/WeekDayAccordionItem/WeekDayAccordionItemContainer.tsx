import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import WeekDayAccordionItem from "./WeekDayAccordionItem";
import { addCleanerToSchedule } from '../../../../store/cleaningReducer';


type Props = {
    weekday: string,
    index: number
}

const WeekDayAccordionItemContainer = ({weekday, index}: Props) => {
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const { cleaners } = useAppSelector(state => state.cleaningReducer);
    const [rooms, setRooms] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let roomNumbers = Object.values(roomTypes).map(roomType => Object.keys(roomType.rooms).map(room => Number(room))).flat();
        setRooms(roomNumbers.sort());
    }, [roomTypes]);

    const handleCleanerAddition = (email: string) => {
        dispatch(addCleanerToSchedule({weekday, email}));
    }

    return <WeekDayAccordionItem weekday={weekday} 
                                 index={index} 
                                 rooms={rooms} 
                                 cleaners={cleaners}
                                 handleCleanerAddition={handleCleanerAddition}  />
}

export default WeekDayAccordionItemContainer;