import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelReducer";
import reservationReducer from "./reservationReducer";


const rootReducer = combineReducers({hotelReducer, reservationReducer});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;