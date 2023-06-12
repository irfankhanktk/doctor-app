import { createSlice } from '@reduxjs/toolkit';

type Props = {
  hotels: any,
  hotel_attributes: any,
};
const initialState: Props = {
  hotels: {},
  hotel_attributes: null,
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setHotelAttributes: (state, action) => {
      state.hotel_attributes = action.payload;
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
  reset,
} = hotelSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default hotelSlice.reducer;
