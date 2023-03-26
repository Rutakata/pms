import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { searchRooms } from "../../../store/hotelReducer";
import { updateArrivalDate, updateDepartureDate } from "../../../store/reservationReducer";
import SearchBar from "./SearchBar";

const SearchBarContainer = () => {
    const { arrival, departure, disabledSearch, filters } = useAppSelector(state => state.reservationReducer);
    const dispatch = useAppDispatch();

    const handleArrivalDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateArrivalDate(e.target.value));
    }

    const handleDepartureDate = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDepartureDate(e.target.value));
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(searchRooms({arrival, departure, roomTypes: filters.roomTypes}));
    }

    return <SearchBar arrival={arrival} 
                      departure={departure} 
                      disabledSearch={disabledSearch} 
                      handleArrivalDate={handleArrivalDate}
                      handleDepartureDate={handleDepartureDate}
                      handleSearch={handleSearch} />
}

export default SearchBarContainer;