import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "./hotelReducer";


type State = {
    arrival: string,
    departure: string,
    peopleNumber: number,
    client: {
        name: string,
        surname: string,
        phone: number,
    },
    note: string,
    filters: {
        roomTypes: {[key: string]: boolean}
    }
}

const initialState: State = {
    arrival: '',
    departure: '',
    peopleNumber: 1,
    client: {
        name: '',
        surname: '',
        phone: 0
    },
    note: '',
    filters: {
        roomTypes: {}
    }
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        updateArrivalDate(state, action) {
            state.arrival = action.payload;
        },
        updateDepartureDate(state, action) {
            state.departure = action.payload;
        },
        setRoomTypesFilter(state, action) {
            action.payload.map((roomType:string) => state.filters.roomTypes[roomType] = false);
        },
        updateRoomTypeFilter(state, action) {
            state.filters.roomTypes[action.payload] = !state.filters.roomTypes[action.payload];
        }
    }
});

export const {updateArrivalDate, 
              updateDepartureDate,
              setRoomTypesFilter,
              updateRoomTypeFilter} = reservationSlice.actions;
export default reservationSlice.reducer;