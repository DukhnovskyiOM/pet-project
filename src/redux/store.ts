import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as deskReducer } from "./room/room.slice";

const redusers = combineReducers({
    desk: deskReducer,
})

export const store = configureStore({
    reducer: redusers,
})