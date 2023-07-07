import { configureStore } from '@reduxjs/toolkit'
import carSlice from './reducers/car-reducer'
import docSlice from './reducers/doctor-reducer'
import hotelSlice from './reducers/hotel-reducer'
import userSlice from './reducers/user-reducer'
import eventSlice from './reducers/event-reducer'

export const store = configureStore({
  reducer: {
    doctor: docSlice,
    user: userSlice,
    hotel: hotelSlice,
    car: carSlice,
    event: eventSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch