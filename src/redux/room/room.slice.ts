import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDesk, IRoomState, IRooms } from "../../models/model";
import axios from "axios";

export const axiosRoomsApi = createAsyncThunk<IRooms[], undefined, {rejectValue: string | unknown}>(
  'rooms/axiosRoomsApi',
  async function(_, {rejectWithValue}) {
    try {
      const response = await axios.get('https://64a7df50dca581464b84ecc6.mockapi.io/rooms');
      return response?.data
    } catch (error) {
      return rejectWithValue('Get Rooms Api')
    }
  }
);

export const addRoomApi = createAsyncThunk<IRooms, IRooms, {rejectValue: string | unknown}>(
  'rooms/addRoomApi',
  async function(room, {rejectWithValue}) {
    try {
      const response = await axios.post('https://64a7df50dca581464b84ecc6.mockapi.io/rooms', room);
      return (await response.data) as IRooms
    } catch (error) {
      return rejectWithValue('Post Rooms Api')
    }
  }
);

export const deleteRoomApi = createAsyncThunk<IRooms, number | undefined, {rejectValue: string | unknown}>(
  'rooms/deleteRoomApi',
  async function(id, {rejectWithValue}) {
    try {
      const response = await axios.delete(`https://64a7df50dca581464b84ecc6.mockapi.io/rooms/${id}`);
      return (await response.data) as IRooms
    } catch (error) {
      return rejectWithValue('Delete Rooms Api')
    }
  }
);

export const editRoomApi = createAsyncThunk<IRooms, string | undefined, {rejectValue: string | unknown, state: IRoomState}>(
  'rooms/editRoomApi',
  async function(name, {rejectWithValue, getState}) {
    const room = getState().place.rooms.find(e => e.name === name)
    
    try {
      const response = await axios.put(`https://64a7df50dca581464b84ecc6.mockapi.io/rooms/${room?.id}`, room);
      return (await response.data) as IRooms
    } catch (error) {
      return rejectWithValue('Put Rooms Api')
    }
  }
);

const initialState: IRoomState = {
  rooms: [],
  loading: false,
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
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
    reserveDeskToRoom: (state, { payload }) => {
      const arrTime = [
        ...state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime.slice(0, payload.startIdTime),
        ...payload.newReserveArr,
        ...state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime.slice(payload.endIdTime)
      ]
      state.rooms[payload.indexRoom].desks[payload.indexDesk].arrTime = arrTime
     },
  },
  extraReducers: (builder) => {
    builder
    .addCase(axiosRoomsApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(axiosRoomsApi.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    })
    .addCase(addRoomApi.fulfilled, (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    })
    .addCase(deleteRoomApi.fulfilled, (state, action) => {
      const index = state.rooms?.findIndex(e => e.id === action.payload.id)
      state.rooms.splice(index, 1)
    })
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    })
  },
});
export const { editDesk, deleteDesk, addNewDesk, reserveDeskToRoom } = roomSlice.actions;
export const { actions } = roomSlice;
export const { reducer } = roomSlice;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
