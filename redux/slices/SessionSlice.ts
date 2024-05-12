import { LoginResult } from "./../../interfaces/dataInterfaces";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProjectCookieValue from "../../functions/getCookieValue";
import { fetchChatters } from "./UsersSlice";

export const fetchSessionData = createAsyncThunk(
  "session",
  async (_, { dispatch }) => {
    const loginResult = getProjectCookieValue();
    if (loginResult) {
      dispatch(
        fetchChatters({
          accessToken: loginResult?.accessToken,
        })
      );
    }
    return loginResult;
  }
);

const CURRENT_USER_SLICE = createSlice({
  name: "currentUser",
  initialState: <LoginResult>{},
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<LoginResult | null>) => {
      if (action.payload) {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.websocketId = action.payload.websocketId;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSessionData.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.websocketId = action.payload.websocketId;
      }
    });
  },
});

export const { updateCurrentUser } = CURRENT_USER_SLICE.actions;
export default CURRENT_USER_SLICE.reducer;
