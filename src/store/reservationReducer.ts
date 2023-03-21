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
    note: string
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
    note: ''
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
    }
});

export const {updateArrivalDate, updateDepartureDate} = reservationSlice.actions;
export default reservationSlice.reducer;