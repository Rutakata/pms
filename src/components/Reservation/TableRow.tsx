import { ChangeEvent } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { IoMdAddCircleOutline } from 'react-icons/io';


type Props = {
    id: number,
    roomType: string,
    price: number,
    available: number,
    peopleNumber: number,
    disabledRoomAdding: boolean,
    handlePeopleNumber: (e: ChangeEvent<HTMLInputElement>, roomType: string) => void,
    handleRoomReservation: (roomType: string) => void
}

const TableRow = ({id, roomType, price, available, peopleNumber, disabledRoomAdding, handlePeopleNumber, handleRoomReservation}: Props) => {
    return (
        <tr>
            <th>{id}</th>
            <th>{roomType}</th>
            <th>{price}</th>
            <th>{available} rooms</th>
            <th>
                <Form.Control type="number" 
                              min={1} 
                              value={peopleNumber} 
                              onChange={(e) => handlePeopleNumber(e, roomType)} 
                              style={{width: '60px'}}/>
            </th>
            <th>
                <Button className="d-flex align-items-center mx-auto" 
                        onClick={() => handleRoomReservation(roomType)}
                        disabled={disabledRoomAdding}>
                    <IoMdAddCircleOutline size={20} />
                </Button>
            </th>
        </tr>
    )
}

export default TableRow;