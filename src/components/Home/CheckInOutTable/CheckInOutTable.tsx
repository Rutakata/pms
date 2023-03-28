import { Table } from "react-bootstrap";
import { RoomReservation } from "../../../store/hotelReducer";
import CheckInTableRow from "./CheckInOutTableRow";


type Props = {
    todayReservations: {[key: string]: RoomReservation},
    isCheckOut: boolean
}

const CheckInTable = ({todayReservations, isCheckOut}: Props) => {
    return Object.keys(todayReservations).length > 0 ? <Table striped bordered hover>
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
    </Table>:
    <h5>No one {isCheckOut ? 'leaves': 'arrives'} today</h5>
}

export default CheckInTable;