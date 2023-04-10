import { Badge } from "react-bootstrap"

type Props = {
    email: string,
    assignedRooms: number[]
}

const CleaningTableRow = ({email, assignedRooms}: Props) => {
    return <tr>
        <th>{email}</th>
        <th>
            <p className="d-flex flex-wrap gap-1">
                {assignedRooms.map((room: number) => <Badge key={room}>{room}</Badge>)}
            </p>
        </th>
    </tr>
}

export default CleaningTableRow;