import { CookieInterface } from "./../../interfaces/dataInterfaces";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProjectCookieValue from "../../functions/getCookieValue";
import { fetchChatters } from "./UsersSlice";

export const fetchSessionData = createAsyncThunk(
  "session",
  async (_, { dispatch }) => {
    try {
      const loginResult = getProjectCookieValue();
      if (!loginResult) {
        throw "";
      }
      if (loginResult) {
        dispatch(
          fetchChatters({
            accessToken: loginResult.accessToken,
          })
        );
      }
      //console.log(loginResult)
      return loginResult;
    } catch (error) {
      return null;
    }
  }
);

const CURRENT_USER_SLICE = createSlice({
  name: "currentUser",
  initialState: <CookieInterface>{},
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<CookieInterface | null>
    ) => {
      if (action.payload) {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.expiresIn = action.payload.expiresIn;
        state.image = action.payload.image;
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
        state.expiresIn = action.payload.expiresIn;
        state.image = action.payload.image;
        state.phone = action.payload.phone;
      }
    });
  },
});

export const { updateCurrentUser } = CURRENT_USER_SLICE.actions;
export default CURRENT_USER_SLICE.reducer;
