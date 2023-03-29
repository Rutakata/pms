import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelReducer";
import reservationReducer from "./reservationReducer";
import userReducer from "./userReducer";
import employeesReducer from "./employeesReducer";


const rootReducer = combineReducers({hotelReducer, reservationReducer, userReducer, employeesReducer});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;