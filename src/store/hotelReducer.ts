import { createSlice } from '@reduxjs/toolkit';


type Room = {}

export type RoomType = {
    roomsNumber: number,
    rooms: { [key: string]: Room },
    price: number
}

type HotelState = {
    hotelName: string,
    owner: string, 
    generalRoomsNumber: number,
    roomTypes: { [key: string]: RoomType },
    currentRoomType: {roomTypeName: string, roomsNumber: number, price: number},
    error: string
}

const initialState: HotelState = {
    hotelName: '',
    owner: '',
    generalRoomsNumber: 0,
    roomTypes: {},
    currentRoomType: {
        roomTypeName: '',
        roomsNumber: 1,
        price: 0
    },
    error: ''
}

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState, 
    reducers: {
        updateHotelSetupData(state, action) {
            state.hotelName = action.payload.hotelName;
            state.generalRoomsNumber = Number(action.payload.generalRoomsNumber);
            state.owner = action.payload.email;
        },
        createRoomType(state) {
            if (state.currentRoomType.roomTypeName.length >= 2) {
                state.error = '';
                state.roomTypes[state.currentRoomType.roomTypeName] = {roomsNumber: state.currentRoomType.roomsNumber, rooms: {}, price: state.currentRoomType.price};
                state.currentRoomType.roomTypeName = '';
                state.currentRoomType.roomsNumber = 1;
            }else {
                state.error = 'Room type name must be 2 or more characters';
            }
        },
        deleteRoomType(state, action) {
            delete state.roomTypes[action.payload];
        },
        updateCurrentRoomTypeName(state, action) {
            state.currentRoomType.roomTypeName = action.payload;
        },
        updateCurrentRoomTypeNumber(state, action) {
            state.currentRoomType.roomsNumber = Number(action.payload);
        },
        updateCurrentRoomTypePrice(state, action) {
            state.currentRoomType.price = Number(action.payload);
        },
        assignRoom(state, action) {
            state.roomTypes[action.payload.roomTypeName].rooms[action.payload.roomNumber] = {};
        }
    }
}) 

export const { updateHotelSetupData, 
               updateCurrentRoomTypeName, 
               updateCurrentRoomTypeNumber,
               updateCurrentRoomTypePrice, 
               createRoomType, 
               deleteRoomType,
               assignRoom } = hotelSlice.actions;
export default hotelSlice.reducer;