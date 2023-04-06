import { useEffect, useState } from 'react';
import { useAppSelector } from "../../../../hooks";
import WeekDayAccordionItem from "./WeekDayAccordionItem";
import { Cleaner } from '../../../../store/cleaningReducer';


type Props = {
    weekday: string,
    index: number,
    cleaners: Cleaner[]
}

const WeekDayAccordionItemContainer = ({weekday, index, cleaners}: Props) => {
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const [rooms, setRooms] = useState<number[]>([]);

    useEffect(() => {
        let roomNumbers = Object.values(roomTypes).map(roomType => Object.keys(roomType.rooms).map(room => Number(room))).flat();
        setRooms(roomNumbers.sort());
    }, [roomTypes]);


    return <WeekDayAccordionItem weekday={weekday} index={index} rooms={rooms} cleaners={cleaners} />
}

export default WeekDayAccordionItemContainer;