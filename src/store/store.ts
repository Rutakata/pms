import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelReducer";
import reservationReducer from "./reservationReducer";
import userReducer from "./userReducer";
import employeesReducer from "./employeesReducer";
import cleaningReducer from "./cleaningReducer";
import { getDefaultMiddleware } from '@reduxjs/toolkit';


const rootReducer = combineReducers({hotelReducer, reservationReducer, userReducer, employeesReducer, cleaningReducer});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;