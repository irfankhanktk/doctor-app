import { createSlice } from '@reduxjs/toolkit'

type Props = {
  userInfo: any
  language: string
  location?: {
    latitude: number,
    longitude: number,
  }
}
const initialState: Props = {
  userInfo: null,
  language: 'en',
  location: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    reset: (state, action) => {
      state = initialState
    },
    // demoAsync: (state, action) => {
    //   state.userInfo = action.payload
    // },
  },
})
// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  reset,
  setLanguage,
  setLocation,
  // demoAsync
} = userSlice.actions

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default userSlice.reducer