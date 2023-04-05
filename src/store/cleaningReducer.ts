import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";


type Cleaning = {
    hotel: string,
    cleaners: {[key: string]: number[]}
}

type State = {
    cleaningId: string|null,
    hotel: string|null,
    cleaners: {[key: string]: number[]},
    loading: boolean
}

const initialState: State = {
    cleaningId: null,
    hotel: null,
    cleaners: {},
    loading: false
}


const cleaningSlice = createSlice({
    name: 'cleaning',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCleaningSchedule.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCleaningSchedule.fulfilled, (state, action) => {
            state.cleaningId = action.payload.cleaningId;
            state.hotel = action.payload.cleaning.hotel;
            state.cleaners = action.payload.cleaning.cleaners;
            state.loading = false;
        })
        .addCase(getCleaningSchedule.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const getCleaningSchedule = createAsyncThunk('cleaning/getCleaningSchedule', async(hotelId: string) => {
    const q = query(collection(db, 'cleaning'), where('hotel', '==', hotelId));
    let cleaning: Cleaning = {
        hotel: '',
        cleaners: {}
    };
    let cleaningId = '';

    let snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        let data = doc.data();
        cleaning.hotel = data.hotel;
        cleaning.cleaners = data.cleaners;
        cleaningId = doc.id;
    })

    return {cleaning, cleaningId};
})

export default cleaningSlice.reducer;