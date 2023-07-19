import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as deskReducer } from "./room/room.slice";
import userReducer from "./user/user.slice";

const redusers = combineReducers({
    place: deskReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: redusers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch