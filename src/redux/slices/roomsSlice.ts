import { Rooms, Room } from "@/types/roomTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Rooms = {
  rooms: [] || undefined,
  totalRoomsCount: 0,
  filteredRoomsCount: 0,
  roomsPerPage: 0,
};

const RoomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addAllRooms(state, action) {
      (state.rooms = action.payload.rooms),
        (state.filteredRoomsCount = action.payload.filteredRoomsCount);
      state.roomsPerPage = action.payload.roomsPerPage;
      state.totalRoomsCount = action.payload.totalRoomsCount;
    },
  },
});

export const { addAllRooms } = RoomsSlice.actions;
export default RoomsSlice.reducer;
