import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        deskAdd: (state, {payload: desk}) => {
            // if(state.some(d => d.id === desk.id)) return
            console.log(desk)
            state.push(desk)
        },
        deskDel: (state, {payload: desk}) => {
            console.log(desk)
            const index = state.findIndex(d => d.id === desk.id)
            if(index !== -1){
                state.splice(index, 1)
            }
            // state.filter(d => d.id === desk.id)
        }
    }
})

export const { actions, reducer } = roomSlice