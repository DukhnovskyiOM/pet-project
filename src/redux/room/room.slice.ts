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
            seats: 0,
            start: "09:00",
            end: "18:00",
          })
          .map((el, i) => ({ ...el, id: i + 1 })),
      };

      console.log(state.rooms, "payload");
      return {
        ...state,
        rooms: [...state.rooms, payload.name = room]

    };

      
    },
    editDesk: (state, { payload }: PayloadAction<IDesk>) => {
      const index = state.rooms?.findIndex(e => e.name === payload.roomName)
      console.log(state.rooms[index].desks);
      state.rooms[index].desks[payload.id - 1 ] = payload

      
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
export const { createRoom, editDesk } = roomSlice.actions;

export const { reducer } = roomSlice;
