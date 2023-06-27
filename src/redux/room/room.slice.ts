import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDesk, IRoomState } from "../../models/model";

const initialState: IRoomState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    createRoom: (state, { payload }) => {
      
      const room = {
        name: payload.name,
        desks: Array(payload.num)
          .fill({
            name: "",
            roomName: payload.name,
            seats: "",
            start: "00:00",
            end: "00:00",
          })
          .map((el, i) => ({ ...el, id: i + 1 })),
      };

      console.log(state.rooms, "payload");
    //   return {
    //     ...state,
    //     rooms: [...state.rooms, payload.name = room]

    // };
    state.rooms = [...state.rooms, room]
      
    },
    editDesk: (state, { payload }: PayloadAction<IDesk>) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      console.log(payload.id);
      state.rooms[index].desks[payload.id - 1 ] = payload

      
    },
    addNewDesk: (state, { payload }) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      console.log(payload);
      //const id = state.rooms[index].desks.length - 1
      const desk = {
            name: "",
            id: payload.id,
            roomName: payload.roomName,
            seats: "",
            start: "00:00",
            end: "00:00",
      };
      //console.log(state.rooms[index].desks);
      state.rooms[index].desks = [...state.rooms[index].desks, desk]

      
    },
    deleteDesk: (state, { payload }) => {

      const indexRoom = state.rooms?.findIndex(e => e.name === payload.roomName)
      const indexDesk = state.rooms[indexRoom]?.desks.findIndex(e => e.id === payload.idDesk)
      console.log(payload.idDesk);
 
      state.rooms[indexRoom].desks.splice(indexDesk, 1)
     },
    delRoom: (state, { payload }) => {

     const index = state.rooms?.findIndex(e => e.name === payload.roomName)

      state.rooms.splice(index, 1)
    },
  },
});
export const { createRoom, editDesk, delRoom, deleteDesk, addNewDesk } = roomSlice.actions;

export const { reducer } = roomSlice;
