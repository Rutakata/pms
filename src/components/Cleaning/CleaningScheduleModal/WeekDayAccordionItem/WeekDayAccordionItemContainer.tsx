import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import WeekDayAccordionItem from "./WeekDayAccordionItem";
import { addCleanerToSchedule, assignRoomToCleaner, removeRoomAssignment, setWeekdayCleanerActive } from '../../../../store/cleaningReducer';


type Props = {
    weekday: string,
    index: number
}

const WeekDayAccordionItemContainer = ({weekday, index}: Props) => {
    const { roomTypes } = useAppSelector(state => state.hotelReducer);
    const { cleaners, newCleaningSchedule } = useAppSelector(state => state.cleaningReducer);
    const [rooms, setRooms] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let roomNumbers = Object.values(roomTypes).map(roomType => Object.keys(roomType.rooms).map(room => Number(room))).flat();
        setRooms(roomNumbers.sort());
    }, [roomTypes]);

    const handleCleanerAddition = (email: string) => {
        dispatch(addCleanerToSchedule({weekday, email}));
    }

    const handleSetCleanerActive = (email: string) => {
        dispatch(setWeekdayCleanerActive({weekday, email}));
    }

    const handleRoomAssignment = (room: number) => {
        if (Object.keys(newCleaningSchedule[weekday]).length > 0) {
            const updatedRooms = rooms;
            updatedRooms.splice(rooms.indexOf(room), 1);
    
            dispatch(assignRoomToCleaner({weekday, room}));
            setRooms(updatedRooms);
        }
    }
    const handleRoomAssignmentRemoval = (email: string, room: number) => {
        let updatedRooms = rooms;
        updatedRooms.push(room);
        updatedRooms.sort();

        dispatch(removeRoomAssignment({weekday, email, room}));
        setRooms(updatedRooms);
    }

    return <WeekDayAccordionItem weekday={weekday} 
                                 index={index} 
                                 rooms={rooms} 
                                 cleaners={cleaners}
                                 newCleaningSchedule={newCleaningSchedule}
                                 handleCleanerAddition={handleCleanerAddition}
                                 handleSetCleanerActive={handleSetCleanerActive}
                                 handleRoomAssignment={handleRoomAssignment}
                                 handleRoomAssignmentRemoval={handleRoomAssignmentRemoval} />
}

export default WeekDayAccordionItemContainer;