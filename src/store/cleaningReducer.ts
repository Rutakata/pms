import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";


type Cleaning = {
    schedule: {[key: string]: number[]}
}

export type Cleaner = {
    email: string
}

type State = {
    cleaningId: string|null,
    cleaners: Cleaner[],
    schedule: {[key: string]: number[]},
    loading: boolean
}

const initialState: State = {
    cleaningId: null,
    cleaners: [],
    schedule: {},
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
            state.schedule = action.payload.cleaning.schedule;
            state.loading = false;
        })
        .addCase(getCleaningSchedule.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getCleaners.pending, (state) => {
            state.loading = false;
        })
        .addCase(getCleaners.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(getCleaners.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const getCleaningSchedule = createAsyncThunk('cleaning/getCleaningSchedule', async(hotelId: string) => {
    const q = query(collection(db, 'cleaning'), where('hotel', '==', hotelId));

    let cleaningId = '';
    let cleaning: Cleaning = {
        schedule: {}
    };

    let snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        let data = doc.data();
        cleaning.schedule = data.schedule;
        cleaningId = doc.id;
    })

    return {cleaning, cleaningId};
})

export const getCleaners = createAsyncThunk('cleaning/getCleaners', async(hotelId: string) => {
    const q = query(collection(db, 'users'), where('hotel', '==', hotelId), where('roles.cleaner', '==', true));
    let cleaners: Cleaner[] = [];

    let snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        console.log(doc.data());
    })

    return null;
})

export default cleaningSlice.reducer;