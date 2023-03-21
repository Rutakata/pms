import { Form } from "react-bootstrap"


type Props = {
    roomType: string
}

const RoomTypeFilterItem = ({roomType}: Props) => {
    return <Form.Group className="px-1">
        <Form.Check type="checkbox" value={roomType} label={roomType} />
    </Form.Group>
}

export default RoomTypeFilterItem;