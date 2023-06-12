import { createSlice } from '@reduxjs/toolkit';

type Props = {
  hotels: any
};
const initialState: Props = {
  hotels: {},

};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },

    reset: (state, action) => {
      state = initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setHotels,
  reset,
} = hotelSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default hotelSlice.reducer;
