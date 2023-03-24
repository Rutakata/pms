import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelReducer";
import reservationReducer from "./reservationReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({hotelReducer, reservationReducer, userReducer});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;