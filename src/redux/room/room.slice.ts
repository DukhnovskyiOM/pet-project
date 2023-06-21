import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        deskAdd: (state, {payload: desk}) => {
            //console.log('tyt');
            
            // if(state.some(d => d.id === desk.id)) return
            state.push(desk)
            //console.log(state[0])
            //console.log('tyt1');
        },
        deskDel: (state, {payload: id}) => {
            //console.log(id)

            const index = state.findIndex(r => r.idDesk === id)
                if(index !== -1) {
                    state.splice(index, 1)
                }
            // const index = state.findIndex(d => d.id === desk.id)
            // if(index !== -1){
            //     state.splice(index, 1)
            // }
            // state.filter(d => d.id === desk.id)

        }
    }
})

export const { actions, reducer } = roomSlice