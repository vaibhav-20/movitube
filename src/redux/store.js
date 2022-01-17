import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies';
import userReducer from '../features/user';
import notificationReducer from '../features/notification';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
