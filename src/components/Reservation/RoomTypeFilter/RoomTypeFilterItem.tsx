import { ChangeEvent } from 'react';
import { Form } from "react-bootstrap";


type Props = {
    roomType: string,
    value: boolean,
    handleRoomTypeCheck: (e: ChangeEvent<HTMLInputElement>) => void
}

const RoomTypeFilterItem = ({roomType, value, handleRoomTypeCheck}: Props) => {
    return <Form.Group className="px-1">
        <Form.Check type="checkbox" name={roomType} checked={value} label={roomType} onChange={handleRoomTypeCheck} />
    </Form.Group>
}

export default RoomTypeFilterItem;