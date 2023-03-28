import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


type State = {
    arrival: string,
    departure: string,
    client: {
        name: string,
        surname: string,
        phone: string,
    },
    note: string,
    filters: {
        roomTypes: {[key: string]: boolean}
    },
    roomTypes: {[key: string]: {
        peopleNumber: number, 
        roomsQuantity: number,
        roomsReserved: number[]
    }},
    disabledSearch: boolean,
    loading: boolean
}

const initialState: State = {
    arrival: '',
    departure: '',
    client: {
        name: '',
        surname: '',
        phone: ''
    },
    note: '',
    filters: {
        roomTypes: {}
    },
    roomTypes: {},
    disabledSearch: true,
    loading: false
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        updateArrivalDate(state, action) {
            state.arrival = action.payload;
            if (state.arrival !== '' && state.departure !== '') {
                state.disabledSearch = false;
            }else {
                state.disabledSearch = true;
            }
        },
        updateDepartureDate(state, action) {
            state.departure = action.payload;
            if (state.arrival !== '' && state.departure !== '') {
                state.disabledSearch = false;
            }else {
                state.disabledSearch = true;
            }
        },
        changeClientName(state, action) {
            state.client.name = action.payload;
        },
        changeClientSurname(state, action) {
            state.client.surname = action.payload;
        },
        changeClientPhone(state, action) {
            state.client.phone = action.payload;
        },
        changePeopleNumber(state, action) {
            state.roomTypes[action.payload.roomType].peopleNumber = Number(action.payload.peopleNumber);
        },
        changeNote(state, action) {
            state.note = action.payload;
        },
        changeRoomsQuantity(state, action) {
            state.roomTypes[action.payload.roomType].roomsQuantity = Number(action.payload.roomsQuantity);
        },
        setRoomTypes(state, action) {
            action.payload.map((roomType: string) => {
                state.roomTypes[roomType] = {
                    peopleNumber: 1, 
                    roomsQuantity: 1,
                    roomsReserved: []
                }
            })
        },
        setRoomTypesFilter(state, action) {
            action.payload.map((roomType:string) => state.filters.roomTypes[roomType] = false);
        },
        updateRoomTypeFilter(state, action) {
            state.filters.roomTypes[action.payload] = !state.filters.roomTypes[action.payload];
        },
        addRoomToReservation(state, action) {
            state.roomTypes[action.payload.roomType].roomsReserved.push(Number(action.payload.roomNumber));
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createReservation.pending, (state) => {
            state.loading = true;
        })
        .addCase(createReservation.fulfilled, (state) => {
            state.loading = false;
            state.arrival = '';
            state.departure = '';
            state.client.name = '';
            state.client.surname = '';
            state.client.phone = '';
            state.note = '';
            Object.keys(state.roomTypes).map(key => {
                state.roomTypes[key].peopleNumber = 1;
                state.roomTypes[key].roomsQuantity = 1;
                state.roomTypes[key].roomsReserved = [];
            })
        })
        .addCase(createReservation.rejected, (state) => {
            state.loading = false;
        })
    }
});


export const createReservation = createAsyncThunk('/reservation/createReservation', 
async({hotelId, roomType, roomNumber, arrival, departure, client, note, peopleNumber}: {
    hotelId: string, 
    roomType: string, 
    roomNumber: string,
    arrival:string,
    departure: string,
    client: {
        name: string,
        surname: string,
        phone: string,
    },
    note: string,
    peopleNumber: number,
}) => {
    const docRef = doc(db, 'hotels', hotelId);
    const path = `roomTypes.${roomType}.rooms.${roomNumber}`;
    console.log(path);
    
    const newReservation = {
        arrival,
        departure,
        client,
        note,
        peopleNumber
    }
    console.log(newReservation);
    
    let response = await updateDoc(docRef, {
        [path]: arrayUnion(newReservation)
    })
})

export const {updateArrivalDate, 
              updateDepartureDate,
              changeClientName,
              changeClientPhone,
              changeClientSurname,
              changePeopleNumber,
              changeNote,
              changeRoomsQuantity,
              setRoomTypes,
              setRoomTypesFilter,
              updateRoomTypeFilter,
              addRoomToReservation} = reservationSlice.actions;
export default reservationSlice.reducer;