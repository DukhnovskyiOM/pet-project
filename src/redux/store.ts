import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as deskReducer } from "./room/room.slice";

const redusers = combineReducers({
    place: deskReducer,
})

export const store = configureStore({
    reducer: redusers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch