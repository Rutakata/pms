import { createSlice } from '@reduxjs/toolkit';


type RoomReservation = {
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
                        let available = 0;
                        const arrDay = action.payload.arrival.slice(8);
                        const arrMonth = action.payload.arrival.slice(5, 7);
                        const arrYear = action.payload.arrival.slice(0, 4);

                        const depDay = action.payload.departure.slice(8);
                        const depMonth = action.payload.departure.slice(5, 7);
                        const depYear = action.payload.departure.slice(0, 4);

                        room.map(reservation => {
                            const resArrDay = reservation.arrival.slice(8);
                            const resArrMonth = reservation.arrival.slice(5, 7);
                            const resArrYear = reservation.arrival.slice(0, 4);

                            const resDepDay = reservation.departure.slice(8);
                            const resDepMonth = reservation.departure.slice(5, 7);
                            const resDepYear = reservation.departure.slice(0, 4);

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
                                    }else if (resArrMonth > depDay) {
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
                            appropriateRooms[roomType].push(roomNumber);
                        }

                        // if (available) appropriateRooms[roomType].push(roomNumber);
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