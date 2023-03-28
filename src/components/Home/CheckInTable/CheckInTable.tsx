import { Table } from "react-bootstrap";
import { RoomReservation } from "../../../store/hotelReducer";
import CheckInTableRow from "./CheckInTableRow";


type Props = {
    todayReservations: {[key: string]: RoomReservation}
}

const CheckInTable = ({todayReservations}: Props) => {
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>Room</th>
                <th>Client</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(todayReservations)
                .map(roomNumber => <CheckInTableRow roomNumber={roomNumber} 
                                                    clientName={todayReservations[roomNumber].client.name}
                                                    clientSurname={todayReservations[roomNumber].client.surname} />)
            }
        </tbody>
    </Table>
}

export default CheckInTable;