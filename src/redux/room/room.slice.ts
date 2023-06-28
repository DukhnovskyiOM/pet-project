import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDesk, IRoomState } from "../../models/model";
import { v4 as uuid } from 'uuid';
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
          .map((el) => ({ ...el, id: uuid() })),
      };

      console.log(state.rooms, "payload");

    state.rooms = [...state.rooms, room]
      
    },
    editDesk: (state, { payload }: PayloadAction<IDesk>) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      const indexDesk = state.rooms[index]?.desks.findIndex(e => e.id === payload.id)
      console.log(indexDesk);
      state.rooms[index].desks[indexDesk] = payload

      
    },
    addNewDesk: (state, { payload }) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      console.log(payload);
      const desk = {
            name: "new desk",
            id: payload.id,
            roomName: payload.roomName,
            seats: "",
            start: "00:00",
            end: "00:00",
      };
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
    reserveDeskToRoom: (state, { payload }) => {
      console.log(payload);
      const indexRoom = state.rooms?.findIndex(e => e.name === payload.dataDesk.roomName)
      const indexDesk = state.rooms[indexRoom]?.desks.findIndex(e => e.id === payload.dataDesk.id)
      const indexTime = state.rooms[indexRoom].desks[indexDesk].arrTime[payload.dataCutArr.num3]
      // const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      console.log(indexTime);
      
      console.log(indexRoom);
      console.log(indexDesk);
      //const seats = (state.rooms[indexRoom].desks[indexDesk].seats) - payload.data.seats
      const newSeats = indexTime - payload.data.seats
      const newArrSeats = new Array(payload.dataCutArr.num6).fill(newSeats)
      const arrTime = [
        ...state.rooms[indexRoom].desks[indexDesk].arrTime.slice(0, payload.dataCutArr.num3),
        ...newArrSeats,
        ...state.rooms[indexRoom].desks[indexDesk].arrTime.slice(payload.dataCutArr.num7)
      ]
      console.log(payload.dataDesk.seats);
      console.log(payload.data.seats);
      console.log(newSeats);
      console.log(newArrSeats);
      console.log(arrTime);
      
      //state.rooms[indexRoom].desks[indexDesk].seats = seats
      state.rooms[indexRoom].desks[indexDesk].arrTime = arrTime
     },
  },
});
export const { createRoom, editDesk, delRoom, deleteDesk, addNewDesk, reserveDeskToRoom } = roomSlice.actions;

export const { reducer } = roomSlice;
