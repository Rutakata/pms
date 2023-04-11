import { Container, Table } from "react-bootstrap";
import { CleaningSchedule } from "../../../store/cleaningReducer";
import CleaningTableRow from "./CleaningTableRow";


type Props = {
    cleaningSchedule: CleaningSchedule,
    weekday: string
}

const CleaningTable = ({cleaningSchedule, weekday}: Props) => {
    return <Container className="mt-3">
        <h3>Schedule for {weekday}</h3>
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Cleaner</th>
                    <th>Assigned rooms</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(cleaningSchedule[weekday]).map(email => 
                    <CleaningTableRow email={email} assignedRooms={cleaningSchedule[weekday][email].assignedRooms} />)}
            </tbody>
        </Table>
    </Container>
}

export default CleaningTable;