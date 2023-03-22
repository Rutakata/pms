import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import RoomTypeFilterItem from "../RoomTypeFilterItem";


type Props = {
    roomTypesFilter: {[key: string]:boolean},
    handleRoomTypeCheck: (e: ChangeEvent<HTMLInputElement>) => void
}

const RoomTypeFilter = ({roomTypesFilter, handleRoomTypeCheck}: Props) => {
    return <Form className="d-flex gap-3">
        { Object.keys(roomTypesFilter).map(roomType => <RoomTypeFilterItem roomType={roomType} 
                                                                            value={roomTypesFilter[roomType]} 
                                                                            key={roomType}
                                                                            handleRoomTypeCheck={handleRoomTypeCheck} />)
        }
    </Form>
}

export default RoomTypeFilter;