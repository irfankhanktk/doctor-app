import { createSlice } from '@reduxjs/toolkit';
import { ADD_HOTEL_DEFAULT } from 'config/constants';

type Props = {
  hotels: any,
  edit_hotel: any,
  hotel_attributes: any,
  room_attributes: any,
  locations: any[],
};
const initialState: Props = {
  hotels: {},
  edit_hotel: {
    row: { ...ADD_HOTEL_DEFAULT, }
  },
  hotel_attributes: null,
  room_attributes: null,
  locations: [],
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setHotelForEdit: (state, action) => {
      state.edit_hotel = action.payload;
    },
    setHotelAttributes: (state, action) => {
      state.hotel_attributes = action.payload;
    },
    setRoomAttributes: (state, action) => {
      state.room_attributes = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setHotels,
  setHotelAttributes,
  setRoomAttributes,
  setLocations,
  setHotelForEdit,
  reset,
} = hotelSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default hotelSlice.reducer;
