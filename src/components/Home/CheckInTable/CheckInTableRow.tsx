type Props = {
    roomNumber: string,
    clientName: string,
    clientSurname: string
}

const CheckInTableRow = ({roomNumber, clientName, clientSurname}: Props) => {
    return <tr>
        <th>{roomNumber}</th>
        <th>{`${clientName} ${clientSurname}`}</th>
    </tr>
}

export default CheckInTableRow;