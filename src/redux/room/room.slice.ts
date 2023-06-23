import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        deskAdd: (state, {payload: desk}) => {
            state.push(desk)
        },
        deskDel: (state, {payload: desk}) => {
            const indexRoom = state.findIndex(r => r.nameRoom === desk.nameRoom)
            if(indexRoom){
                const indexDesk = state.findIndex(r => r.idDesk === desk.id)
                    if(indexDesk !== -1) {
                        state.splice(indexDesk, 1)
                    }

            }
        }
    }
})

export const { actions, reducer } = roomSlice