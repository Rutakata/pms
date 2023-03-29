import { useAppSelector } from "../../../hooks";
import Price from "./Price"


const PriceContainer = () => {
    const { roomTypes } = useAppSelector(state => state.hotelReducer);

    return <Price roomTypesPrices={roomTypes} />
}

export default PriceContainer;