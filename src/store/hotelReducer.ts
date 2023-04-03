import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';


export type RoomReservation = {
    arrival: string,
    departure: string,
    peopleNumber: number,
    client: {
        name: string,
        surname: string,
        phone: number
    },
    note: string
}

type HotelData = {
    hotelName: string,
    owner: string,
    employeeCode: string,
    generalRoomsNumber: number, 
    roomTypes: { [key: string]: RoomType }
}

export type RoomType = {
    roomsNumber: number,
    rooms: { [key: string]: (RoomReservation[]) },
    price: number
}

type HotelState = {
    hotelName: string,
    hotelId: string,
    owner: string, 
    employeeCode: string,
    generalRoomsNumber: number,
    roomTypes: { [key: string]: RoomType },
    filteredRooms: { [key: string]: RoomType },
    currentRoomType: {roomTypeName: string, roomsNumber: number, price: number},
    error: string,
    loading: boolean
}

const initialState: HotelState = {
    hotelName: '',
    hotelId: '',
    owner: '',
    employeeCode: '',
    generalRoomsNumber: 0,
    roomTypes: {},
    filteredRooms: {},
    currentRoomType: {
        roomTypeName: '',
        roomsNumber: 1,
        price: 0
    },
    error: '',
    loading: false
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
            state.employeeCode = action.payload.employeeCode;
            state.generalRoomsNumber = action.payload.generalRoomsNumber;
            state.roomTypes = action.payload.roomTypes;
            state.hotelId = action.payload.id;
        },
        searchRooms(state, action) {
            let appropriateRooms: { [key: string]: RoomType } = {};


            Object.keys(state.roomTypes).map((roomType) => {
                const roomTypeObj: RoomType = state.roomTypes[roomType];
                appropriateRooms[roomType] = {roomsNumber: roomTypeObj.roomsNumber, price: roomTypeObj.price, rooms: {}};
                Object.keys(roomTypeObj.rooms).map((roomNumber) => {
                    const room: RoomReservation[] = roomTypeObj.rooms[roomNumber];

                    if (room.length === 0) {
                        appropriateRooms[roomType].rooms[roomNumber] = [];
                    }else {
                        let available = 0;
                        const arrDay = Number(action.payload.arrival.slice(8));
                        const arrMonth = Number(action.payload.arrival.slice(5, 7));
                        const arrYear = Number(action.payload.arrival.slice(0, 4));

                        const depDay = Number(action.payload.departure.slice(8));
                        const depMonth = Number(action.payload.departure.slice(5, 7));
                        const depYear = Number(action.payload.departure.slice(0, 4));

                        room.map(reservation => {
                            const resArrDay = Number(reservation.arrival.slice(8));
                            const resArrMonth = Number(reservation.arrival.slice(5, 7));
                            const resArrYear = Number(reservation.arrival.slice(0, 4));

                            const resDepDay = Number(reservation.departure.slice(8));
                            const resDepMonth = Number(reservation.departure.slice(5, 7));
                            const resDepYear = Number(reservation.departure.slice(0, 4));

                            if (resArrYear < arrYear) {
                                if (resDepYear < arrYear) {
                                    available++;
                                }else if (resDepYear === arrYear) {
                                    if (resDepMonth < arrMonth) {
                                        available++;
                                    }else if (resDepMonth === arrMonth) {
                                        if (resDepDay <= arrDay) {
                                            available++;
                                        }
                                    }
                                }
                            }else if (resArrYear === arrYear) {
                                if (resArrMonth === arrMonth) {
                                    if (resArrDay < arrDay) {
                                        if (resDepDay <= arrDay) {
                                            available++;
                                        }
                                    }else if (resArrDay > arrDay) {
                                        if (resArrDay >= depDay) {
                                            available++;
                                        }
                                    }
                                }else if (resArrMonth > arrMonth) {
                                    if (resArrMonth === depMonth) {
                                        if (resArrDay >= depDay) {
                                            available++;
                                        }
                                    }else if (resArrMonth > depMonth) {
                                        available++;
                                    }
                                }else if (resDepMonth < arrMonth) {
                                    available++;
                                }else if (resDepMonth === arrMonth) {
                                    if (resDepDay <= arrDay) {
                                        available++;
                                    }
                                }
                            }else if (resArrYear > arrYear){
                                if (resArrYear > depYear) {
                                    available++;
                                }else if (resArrYear === depYear) {
                                    if (resArrMonth > depMonth) {
                                        available++;
                                    }else if (resArrMonth === depMonth) {
                                        if (resArrDay >= depDay) {
                                            available++
                                        }
                                    }
                                }
                            }
                        })
                        
                        if (available === room.length) {
                            appropriateRooms[roomType].rooms[roomNumber] = [];
                        }
                    }
                })
            })

            if (Object.keys(action.payload.roomTypes).every((roomType: string) => action.payload.roomTypes[roomType] === false)) {
                state.filteredRooms = appropriateRooms;
            }else if (Object.keys(action.payload.roomTypes).every((roomType: string) => action.payload.roomTypes[roomType] === true)) {
                state.filteredRooms = appropriateRooms;
            }else {
                Object.keys(action.payload.roomTypes).map(roomType => {
                    if (action.payload.roomTypes[roomType] === true) {
                        state.filteredRooms[roomType] = appropriateRooms[roomType];
                    }else {
                        delete state.filteredRooms[roomType];
                    }
                })
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createHotel.pending, (state) => {
            state.loading = true;
        })
        .addCase(createHotel.fulfilled, (state, action) => {
            console.log(action.payload.response);
            state.hotelId = action.payload.response.id;
            state.loading = false;
        })
        .addCase(createHotel.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getHotelData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getHotelData.fulfilled, (state, action) => {
            if (action.payload.snapshot.exists()) {
                let hotelData = action.payload.snapshot.data();
                let hotelId = action.payload.snapshot.id;
                state.hotelName = hotelData.hotelName;
                state.owner = hotelData.owner;
                state.generalRoomsNumber = hotelData.generalRoomsNumber;
                state.roomTypes = hotelData.roomTypes;
                state.employeeCode = hotelData.employeeCode;
                state.hotelId = hotelId;
            }
            state.loading = false;
        })
        .addCase(getHotelData.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const createHotel = createAsyncThunk('hotel/createHotel', 
async({hotelName, owner, generalRoomsNumber, roomTypes}: HotelData) => {
    let response = await addDoc(collection(db, 'hotels'), {
        hotelName, 
        owner,
        generalRoomsNumber,
        roomTypes,
        isCleaningSet: false
    })

    return {response};
})


export const getHotelData = createAsyncThunk('hotel/getHotelData', async(hotelId: string) => {
    const docRef = doc(db, 'hotels', hotelId);
    let snapshot = await getDoc(docRef);

    return {snapshot};
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