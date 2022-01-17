import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userLoading: false,
    info: null,
    id: null,
    userLoggedIn: false,
  },
};

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    userLoadingBegins: (state = initialState) => {
      state.value = { ...state.value, userLoading: true };
    },
    userLoadingEnds: (state = initialState) => {
      state.value = { ...state.value, userLoading: false };
    },

    storeUserInfo: (state = initialState, action) => {
      state.value = {
        ...state.value,
        userLoading: false,
        info: action.payload.info,
        id: action.payload.id,
        userLoggedIn: true,
      };
    },

    logOut: (state = initialState) => {
      state.value = {
        userLoading: false,
        info: null,
        id: null,
        userLoggedIn: false,
      };
    },
  },
});

export const { userLoadingBegins, storeUserInfo, userLoadingEnds, logOut } =
  userSlice.actions;

export default userSlice.reducer;
