import { OverlayTrigger, Popover } from "react-bootstrap";


type Props = {
    roomNumber: string,
    client: {
        name: string,
        surname: string,
        phone: number
    }
}

const CheckInTableRow = ({roomNumber, client}: Props) => {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as='h3'>Client Information</Popover.Header>
            <Popover.Body className="p-2">
                <p>Client's name: {client.name}</p>
                <p>Client's surname: {client.surname}</p>
                <p className="m-0">Client's phone: {client.phone}</p>
            </Popover.Body>
        </Popover>
    )

    return <tr>
        <th>{roomNumber}</th>
        <th>
            <OverlayTrigger trigger={['hover','focus']} placement="right" overlay={popover}>
                <span>{`${client.name} ${client.surname}`}</span>
            </OverlayTrigger>
        </th>
        
    </tr>
}

export default CheckInTableRow;