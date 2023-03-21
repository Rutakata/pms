import { createSlice } from '@reduxjs/toolkit';


type RoomReservation = {
    arrival: Date,
    departure: Date,
    peopleNumber: number,
    client: {
        name: string,
        surname: string,
        phone: number
    },
    note: string
}

export type RoomType = {
    roomsNumber: number,
    rooms: { [key: string]: RoomReservation[] },
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
            state.roomTypes[action.payload.roomTypeName].rooms[action.payload.roomNumber] = [];
        },
        setHotelData(state, action) {
            state.hotelName = action.payload.hotelName;
            state.owner = action.payload.owner;
            state.generalRoomsNumber = action.payload.generalRoomsNumber;
            state.roomTypes = action.payload.roomTypes;
        },
        searchRooms(state, action) {
            let appropriateRooms: { [key: string]: string[] } = {};

            Object.keys(state.roomTypes).map((roomType) => {
                const roomTypeObj: RoomType = state.roomTypes[roomType];
                appropriateRooms[roomType] = [];
                Object.keys(roomTypeObj.rooms).map((roomNumber) => {
                    const room: RoomReservation[] = roomTypeObj.rooms[roomNumber];

                    if (room.length === 0) {
                        appropriateRooms[roomType].push(roomNumber);
                    }else {
                        let available = room.every(reservation => {
                            reservation.arrival !== action.payload.arrival;
                            reservation.departure !== action.payload.departure;
                        })
                        
                        if (available) appropriateRooms[roomType].push(roomNumber);
                    }
                })
            })

            console.log(appropriateRooms);
        }
    }
}) 

export const { updateHotelSetupData, 
               updateCurrentRoomTypeName, 
               updateCurrentRoomTypeNumber,
               updateCurrentRoomTypePrice, 
               createRoomType, 
               deleteRoomType,
               assignRoom,
               setHotelData,
               searchRooms } = hotelSlice.actions;
export default hotelSlice.reducer;