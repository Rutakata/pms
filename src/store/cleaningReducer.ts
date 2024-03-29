import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";


export type CleaningSchedule = {
    [weekday: string]: {
        [cleaner: string]: {
            assignedRooms: number[],
            isActive?: boolean
        },
    },
}

export type Cleaner = {
    email: string
}

type State = {
    cleaningId: string|null,
    cleaners: Cleaner[],
    cleaningSchedule: CleaningSchedule,
    newCleaningSchedule: CleaningSchedule,
    loading: boolean
}

const initialState: State = {
    cleaningId: null,
    cleaners: [],
    cleaningSchedule: {},
    newCleaningSchedule: {},
    loading: false
}


export const cleaningSlice = createSlice({
    name: 'cleaning',
    initialState,
    reducers: {
        addCleanerToSchedule(state, action) {
            Object.keys(state.newCleaningSchedule[action.payload.weekday]).map(cleaner => {
                state.newCleaningSchedule[action.payload.weekday][cleaner].isActive = false;
            })

            state.newCleaningSchedule[action.payload.weekday][action.payload.email] = {
                assignedRooms: [],
                isActive: true
            };
        },
        setWeekdays(state, action) {
            action.payload.map((weekday: string) => {
                state.newCleaningSchedule[weekday] = {};
            })
        },
        assignRoomToCleaner(state, action) {
            Object.keys(state.newCleaningSchedule[action.payload.weekday]).map(cleaner => {
                if (state.newCleaningSchedule[action.payload.weekday][cleaner].isActive) {
                    state.newCleaningSchedule[action.payload.weekday][cleaner].assignedRooms.push(action.payload.room);
                }
            })
        },
        removeRoomAssignment(state, action) {
            let weekday = action.payload.weekday;
            let email = action.payload.email;
            let room = action.payload.room;

            state.newCleaningSchedule[weekday][email].assignedRooms
            .splice(state.newCleaningSchedule[weekday][email].assignedRooms.indexOf(room), 1);
        },
        setWeekdayCleanerActive(state, action) {
            Object.keys(state.newCleaningSchedule[action.payload.weekday]).map(cleaner => {
                state.newCleaningSchedule[action.payload.weekday][cleaner].isActive = false;
            })

            state.newCleaningSchedule[action.payload.weekday][action.payload.email].isActive = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCleaningSchedule.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCleaningSchedule.fulfilled, (state, action) => {
            state.cleaningId = action.payload.cleaningId;
            state.cleaningSchedule = action.payload.cleaningSchedule;
            state.loading = false;
        })
        .addCase(getCleaningSchedule.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getCleaners.pending, (state) => {
            state.loading = false;
        })
        .addCase(getCleaners.fulfilled, (state, action) => {
            state.loading = false;
            state.cleaners = action.payload;
        })
        .addCase(getCleaners.rejected, (state) => {
            state.loading = false;
        })
        .addCase(createCleaningSchedule.pending, (state) => {
            state.loading = false;
        })
        .addCase(createCleaningSchedule.fulfilled, (state, action) => {
            state.loading = false;
            state.cleaningId = action.payload;
            state.newCleaningSchedule = {};
        })
        .addCase(createCleaningSchedule.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const getCleaningSchedule = createAsyncThunk('cleaning/getCleaningSchedule', async(hotelId: string) => {
    const q = query(collection(db, 'cleaning'), where('hotel', '==', hotelId));

    let cleaningId = '';
    let cleaningSchedule: CleaningSchedule = {};

    let snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        let data = doc.data();
        if (!data.schedule) {
            cleaningSchedule = {};
        }else {
            cleaningSchedule = data.schedule;
        }
        cleaningId = doc.id;
    })

    return {cleaningSchedule, cleaningId};
})

export const getCleaners = createAsyncThunk('cleaning/getCleaners', async(hotelId: string) => {
    const q = query(collection(db, 'users'), where('hotel', '==', hotelId), where('roles.cleaner', '==', true));
    let cleaners: Cleaner[] = [];

    let snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        cleaners.push({email: doc.data().email});
    })

    return cleaners;
})

export const createCleaningSchedule = createAsyncThunk('cleaning/createCleaningSchedule', 
async({hotelId, cleaningId, newCleaningSchedule}: {hotelId: string, cleaningId: string|null, newCleaningSchedule: CleaningSchedule}) => {
    let docId:string|null = cleaningId;
    
    if (!cleaningId) {
        const newDocRef = doc(collection(db, 'cleaning'));
        docId = newDocRef.id;
    }
    
    if (docId) {
        const cleaningRef = doc(db, 'cleaning', docId);
        await setDoc(cleaningRef, {hotel: hotelId, schedule: newCleaningSchedule}, {merge: true});
    }
    
    return docId;
})


export const {addCleanerToSchedule, 
              setWeekdays, 
              assignRoomToCleaner, 
              setWeekdayCleanerActive,
              removeRoomAssignment} = cleaningSlice.actions;
export default cleaningSlice.reducer;