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
        id: payload.id,
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
    state.rooms = [...state.rooms, room]
    },
    editDesk: (state, { payload }: PayloadAction<IDesk>) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      const indexDesk = state.rooms[index]?.desks.findIndex(e => e.id === payload.id)
      state.rooms[index].desks[indexDesk] = payload
    },
    addNewDesk: (state, { payload }) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      const desk = {
            name: "",
            id: payload.id,
            roomName: payload.roomName,
            seats: null,
            start: "00:00",
            end: "00:00",
            arrTime: []
      };
      state.rooms[index].desks = [...state.rooms[index].desks, desk]
    },
    deleteDesk: (state, { payload }) => {
      const indexRoom = state.rooms?.findIndex(e => e.name === payload.roomName)
      const indexDesk = state.rooms[indexRoom]?.desks.findIndex(e => e.id === payload.idDesk)
      state.rooms[indexRoom].desks.splice(indexDesk, 1)
     },
    delRoom: (state, { payload }) => {
     const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      state.rooms.splice(index, 1)
    },
    reserveDeskToRoom: (state, { payload }) => {
      const arrTime = [
        ...state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime.slice(0, payload.startIdTime),
        ...payload.newReserveArr,
        ...state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime.slice(payload.endIdTime)
      ]
      state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime = arrTime
     },
  },
});
export const { createRoom, editDesk, delRoom, deleteDesk, addNewDesk, reserveDeskToRoom } = roomSlice.actions;

export const { reducer } = roomSlice;
