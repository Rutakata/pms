import { Button, Form } from "react-bootstrap";
import { IoMdAddCircleOutline } from 'react-icons/io';


type Props = {
    id: number,
    roomType: string,
    price: number,
    available: number
}

const TableRow = ({id, roomType, price, available}: Props) => {
    return (
        <tr>
            <th>{id}</th>
            <th>{roomType}</th>
            <th>{price}</th>
            <th>{available}</th>
            <th>
                <Form.Control type="number" min={1} style={{width: '60px'}}/>
            </th>
            <th>
                <Form.Control type="number" min={1} style={{width: '60px'}}/>
            </th>
            <th className="d-flex justify-content-center">
                <Button className="d-flex align-items-center">
                    <IoMdAddCircleOutline size={20} />
                </Button>
            </th>
        </tr>
    )
}

export default TableRow;