import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelReducer";


const rootReducer = combineReducers({hotelReducer});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;