import { createSlice } from '@reduxjs/toolkit';
import { DATE_FORMAT } from 'config/constants';
import moment from 'moment';

type Props = {
  cars: any,
  edit_car: any,
  car_attributes: any,
  // room_attributes: any,
  locations: any[],
  car_filter: any,
};
const initialState: Props = {
  cars: {},
  edit_car: null,
  car_attributes: null,
  // room_attributes: null,
  locations: [],
  car_filter: {
    location_id: null,
    start_date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    end_date: moment(moment().add(1, 'd')).format(DATE_FORMAT.yyyy_mm_dd),

    number: '1',
    price_range: [0, 900],
    star_rate: [],
    review_score: [],
    terms: [], //array of numbers
  },
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setCarForEdit: (state, action) => {
      state.edit_car = action.payload;
    },
    setCarAttributes: (state, action) => {
      state.car_attributes = action.payload;
    },
    setCarFilter: (state, action) => {
      state.car_filter = action.payload;
    },
    setClearCarFilter: (state, action) => {
      state.car_filter = initialState?.car_filter;
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setCars,
  setCarAttributes,
  // setRoomAttributes,
  setCarForEdit,
  setClearCarFilter,
  setCarFilter,
  reset,
} = carSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default carSlice.reducer;
