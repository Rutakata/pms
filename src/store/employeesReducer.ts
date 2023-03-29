import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";


export type Employee = {
    userId: string,
    email: string,
    hotel: string,
    roles: { [key: string]: boolean },
}

type State = {
    employees: Employee[],
    loading: boolean
}

const initialState: State = {
    employees: [],
    loading: false
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getHotelEmployees.pending, (state) => {
            state.loading = true;
        })
        .addCase(getHotelEmployees.fulfilled, (state, action) => {
            let employees: Employee[] = [];
            
            action.payload.snapshot.forEach(doc => {
                let data = doc.data();
                let employee = {
                    email: data.email,
                    hotel: data.hotel,
                    roles: data.roles,
                    userId: doc.id
                }
                employees.push(employee);
            })

            state.employees = employees;
            state.loading = false;
        })
        .addCase(getHotelEmployees.rejected, (state) => {
            state.loading = false;
        })
    }
})


export const getHotelEmployees = createAsyncThunk('emloyees/getHotelEmployees', async(hotelId: string) => {
    const employeesRef = collection(db, 'users');
    const q = query(employeesRef, where('hotel', '==', hotelId));

    console.log(hotelId);

    let snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        console.log(doc.data());
    })

    return {snapshot}
})

export default employeeSlice.reducer;