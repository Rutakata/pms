import { useEffect, useState } from "react";
import { RoomReservation } from "../../../store/hotelReducer";
import AccordionItem from "./AccordionItem";


type Props = {
    roomTypeName: string,
    index: string,
    roomType: {
        roomsNumber: number,
        rooms: { [key: string]: RoomReservation[] },
        price: number
    },
    currentDate: string
}

const AccordionItemContainer = ({roomTypeName, index, roomType, currentDate}: Props) => {
    const [rooms, setRooms] = useState<{[key: string]: RoomReservation}>({});

    useEffect(() => {
        setRooms({});

        Object.keys(roomType.rooms).map(roomNumber => {
            roomType.rooms[roomNumber].map(reservation => {
                const arrivalDate = new Date(reservation.arrival);
                const departureDate = new Date(reservation.departure);
                const now = new Date(currentDate);

                if (arrivalDate <= now && now <= departureDate) {
                    setRooms({...rooms, [roomNumber]: reservation});
                }
            })
        })
    }, [currentDate])

    return <AccordionItem roomTypeName={roomTypeName} index={`${index}`} rooms={rooms} currentDate={currentDate} />
}

export default AccordionItemContainer;