import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../hooks";

const Price = () => {
    const {roomTypes} = useAppSelector(state => state.reservationReducer);

    return <Container>
        {Object.keys(roomTypes).reduce((acc, roomType) => acc += roomTypes[roomType].roomsReserved.length, 0)}
    </Container>
}

export default Price;