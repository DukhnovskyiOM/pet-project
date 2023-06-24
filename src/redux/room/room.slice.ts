import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDesk, IRoomState } from "../../models/model";

const initialState: IRoomState = {
  rooms: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    deskAdd: (state, { payload }) => {
      state.rooms = payload;
    },
    createRoom: (state, { payload }) => {
      console.log(payload, "payload");

      state.rooms = {
        name: payload.name,
        desks: Array(payload.num)
          .fill({
            name: "",
            seats: 0,
            start: "09:00",
            end: "18:00",
          })
          .map((el, i) => ({ ...el, id: i + 1 })),
      };
    },
    editDesk: (state, { payload }: PayloadAction<IDesk>) => {
      if (state.rooms) {
        state.rooms = {
          ...state.rooms,
          desks: state.rooms.desks.map((desk) => {
            if (desk.id === payload.id) {
              return payload;
            } else {
              return desk;
            }
          }),
        };
      }
    },
    // deskDel: (state, { payload: desk }) => {
    //   const indexRoom = state.findIndex((r) => r.nameRoom === desk.nameRoom);
    //   if (indexRoom) {
    //     const indexDesk = state.findIndex((r) => r.idDesk === desk.id);
    //     if (indexDesk !== -1) {
    //       state.splice(indexDesk, 1);
    //     }
    //   }
    // },
  },
});
export const { deskAdd, createRoom, editDesk } = roomSlice.actions;

export const { reducer } = roomSlice;
