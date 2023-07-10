import { createSlice } from '@reduxjs/toolkit';
import { DATE_FORMAT } from 'config/constants';
import moment from 'moment';

type Props = {
  tours: any,
  edit_tour: any,
  tour_attributes: any,
  // room_attributes: any,
  locations: any[],
  tour_filter: any,
};
const initialState: Props = {
  tours: {},
  edit_tour: null,
  tour_attributes: null,
  // room_attributes: null,
  locations: [],
  tour_filter: {
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

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setTours: (state, action) => {
      state.tours = action.payload;
    },
    setTourForEdit: (state, action) => {
      state.edit_tour = action.payload;
    },
    setTourAttributes: (state, action) => {
      state.tour_attributes = action.payload;
    },
    setTourFilter: (state, action) => {
      state.tour_filter = action.payload;
    },
    setClearTourFilter: (state, action) => {
      state.tour_filter = initialState?.tour_filter;
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setTours,
  setTourAttributes,
  // setRoomAttributes,
  setTourForEdit,
  setClearTourFilter,
  setTourFilter,
  reset,
} = tourSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default tourSlice.reducer;
