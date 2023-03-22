import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateRoomTypeFilter } from "../../../store/reservationReducer";
import RoomTypeFilterItem from "./RoomTypeFilterItem";


const RoomTypeFilter = () => {
    const { filters } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    const handleRoomTypeCheck = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRoomTypeFilter(e.target.name));
    }

    return <Form className="d-flex gap-3">
        { Object.keys(filters.roomTypes).map(roomType => <RoomTypeFilterItem roomType={roomType} 
                                                                            value={filters.roomTypes[roomType]} 
                                                                            key={roomType}
                                                                            handleRoomTypeCheck={handleRoomTypeCheck} />)
        }
    </Form>
}

export default RoomTypeFilter;