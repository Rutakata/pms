import { createSlice } from '@reduxjs/toolkit';

type RoomType = {
    roomType: string, 
    roomsNumber: number
}

type HotelState = {
    hotelName: string, 
    generalRoomsNumber: number,
    roomTypes: { [key: string]: RoomType }
}

const initialState: HotelState = {
    hotelName: '',
    generalRoomsNumber: 0,
    roomTypes: {}
}

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState, 
    reducers: {
        updateHotelSetupData(state, action) {
            state.hotelName = action.payload.hotelName;
            state.generalRoomsNumber = Number(action.payload.generalRoomsNumber);
        }
    }
}) 

export const { updateHotelSetupData } = hotelSlice.actions;
export default hotelSlice.reducer;