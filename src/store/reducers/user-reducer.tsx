import {createSlice} from '@reduxjs/toolkit';

type Props = {
  userInfo: any;
  transaction_id: any;

  language: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  notifications: any[];
  wallet: any;
  unreadNotification: number;
  locations: any[];
};
const initialState: Props = {
  userInfo: null,
  transaction_id: null,

  language: 'en',
  location: undefined,
  notifications: [],
  wallet: {},
  unreadNotification: 0,
  locations: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setTransactionId: (state, action) => {
      state.transaction_id = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    reset: (state, action) => {
      state = initialState;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadNotification = action.payload?.filter(
        (x: any) => !x?.is_read,
      )?.length;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    // demoAsync: (state, action) => {
    //   state.userInfo = action.payload
    // },
  },
});
// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  reset,
  setLanguage,
  setLocation,
  setNotifications,
  setTransactionId,

  setLocations,
  setWallet,
  // demoAsync
} = userSlice.actions;

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default userSlice.reducer;
