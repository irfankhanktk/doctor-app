import { createSlice } from '@reduxjs/toolkit';
import { DATE_FORMAT } from 'config/constants';
import moment from 'moment';

type Props = {
  events: any,
  edit_event: any,
  event_attributes: any,
  // room_attributes: any,
  locations: any[],
  event_filter: any,
};
const initialState: Props = {
  events: {},
  edit_event: null,
  event_attributes: null,
  // room_attributes: null,
  locations: [],
  event_filter: {
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

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setEventForEdit: (state, action) => {
      state.edit_event = action.payload;
    },
    setEventAttributes: (state, action) => {
      state.event_attributes = action.payload;
    },
    setEventFilter: (state, action) => {
      state.event_filter = action.payload;
    },
    setClearEventFilter: (state, action) => {
      state.event_filter = initialState?.event_filter;
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setEvents,
  setEventAttributes,
  // setRoomAttributes,
  setEventForEdit,
  setClearEventFilter,
  setEventFilter,
  reset,
} = eventSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default eventSlice.reducer;
