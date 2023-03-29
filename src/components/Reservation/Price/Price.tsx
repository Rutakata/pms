import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../hooks";
import { RoomType } from "../../../store/hotelReducer";


type Props = {
    roomTypesPrices: {
        [key: string]: RoomType
    }
}

const Price = ({ roomTypesPrices }: Props) => {
    const { roomTypes } = useAppSelector(state => state.reservationReducer);

    return <Container>
        <h5 className="mb-0">
            Price: {' '}
            {Object.keys(roomTypes).reduce(
            (acc, roomType) => acc += 
                (roomTypes[roomType].roomsReserved.length*roomTypesPrices[roomType].price*roomTypes[roomType].peopleNumber), 
            0)}
        </h5>
    </Container>
}

export default Price;