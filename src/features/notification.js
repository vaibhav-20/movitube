import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    message: null,
    success: false,
    error: false,
  },
};

export const notificationSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    errorNofication: (state = initialState, action) => {
      state.value = {
        ...state.value,
        message: action.payload,
        error: true,
        success: false,
      };
    },

    successNofication: (state = initialState, action) => {
      state.value = {
        ...state.value,
        message: action.payload,
        success: true,
        error: false,
      };
    },

    clearNotification: (state = initialState) => {
      state.value = {
        message: null,
        success: false,
        error: false,
      };
    },
  },
});

export const { errorNofication, successNofication, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
