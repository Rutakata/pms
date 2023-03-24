import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";


type UserState = {
    userId: string,
    email: string,
    hotel: string,
    roles: {[key: string]: boolean},
    loading: boolean,
    error: string
}

const initialState: UserState = {
    userId: '',
    email: '',
    hotel: '',
    roles: {},
    loading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state) => {
            state.error = '';
            state.loading = false;
        })
        .addCase(createUser.rejected, (state) => {
            state.loading = false;
            state.error = "User was not created";
        })
        .addCase(getUserData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.error = '';
            action.payload.snapshot.forEach(doc => {
                let userData = doc.data();
                state.email = userData.email;
                state.hotel = userData.hotel;
                state.roles = userData.roles;
                state.userId = doc.id;
            })
            state.loading = false;
        })
        .addCase(getUserData.rejected, (state) => {
            state.loading = false;
            state.error = 'Could not find user';
        })
        .addCase(assignHotelId.pending, (state) => {
            state.loading = true;
        })
        .addCase(assignHotelId.fulfilled, (state) => {
            state.error = '';
            state.loading = false;
        })
        .addCase(assignHotelId.rejected, (state) => {
            state.loading = false;
            state.error = 'Hotel ID was not assigned';
        })
    }
})

export const createUser = createAsyncThunk('user/createUser', async(email: string) => {
    const newUser = {
        email,
        hotel: null,
        roles: {owner: false, reseptionist: false, cleaner: false}
    }

    let response = await addDoc(collection(db, 'users'), newUser);
})

export const getUserData = createAsyncThunk('user/getUserData', async(email: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
      
    let snapshot = await getDocs(q);

    return {snapshot};
})

export const assignHotelId = createAsyncThunk('user/assignHotelId', async({hotelId, userId}: {hotelId: string, userId: string}) => {
    const docRef = doc(db, 'users', userId);
    let response = await updateDoc(docRef, {hotel: hotelId, roles: {owner: true, receptionist: true, cleaner: true}});
    console.log(response);
    
})

export default userSlice.reducer;