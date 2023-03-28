import { ChangeEvent } from 'react';
import { Table } from "react-bootstrap";
import { RoomType } from "../../../store/hotelReducer";
import TableRow from "./TableRow";


type Props = {
    filteredRooms: {[key: string]: RoomType},
    roomTypes: {[key: string]: {peopleNumber: number} },
    disabledRoomAdding: boolean,
    handlePeopleNumber: (e: ChangeEvent<HTMLInputElement>, roomType: string) => void,
    handleRoomReservation: (roomType: string) => void
}

const RoomsTable = ({filteredRooms, roomTypes, disabledRoomAdding, handlePeopleNumber, handleRoomReservation}: Props) => {
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>№</th>
                <th>Room type</th>
                <th>Price</th>
                <th>Available</th>
                <th>People</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(filteredRooms).map((roomType, index) => <TableRow id={index+1} 
                                                                        key={roomType}
                                                                        roomType={roomType} 
                                                                        price={filteredRooms[roomType].price}
                                                                        disabledRoomAdding={disabledRoomAdding}
                                                                        available={Object.keys(filteredRooms[roomType].rooms).length}
                                                                        peopleNumber={roomTypes[roomType].peopleNumber}
                                                                        handlePeopleNumber={handlePeopleNumber}
                                                                        handleRoomReservation={handleRoomReservation} />)
            }
        </tbody>
    </Table>
}

export default RoomsTable;