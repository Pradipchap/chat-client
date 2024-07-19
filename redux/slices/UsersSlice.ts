import { ChatterInterface } from "./../../interfaces/dataInterfaces";
import {
  FriendBoxInterface,
  UserFetchResults,
} from "../../interfaces/dataInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_BASE_URL } from "../../utils/constants";
import { updateSecondaryChatter } from "./ChatSlice";
interface users {
  users: FriendBoxInterface[];
  chatters: ChatterInterface[];
  FriendRequests: FriendBoxInterface[];
  Friends: FriendBoxInterface[];
  loading: boolean;
  error: boolean;
}

export const fetchUsers = createAsyncThunk(
  "users",
  async (primaryChatter: string, { dispatch }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/users`);
      const { users }: UserFetchResults = await response.json();
      const finalUsers = users.filter((user) => {
        return user._id !== primaryChatter;
      });
      dispatch(updateSecondaryChatter(finalUsers[0]._id));
      return finalUsers;
    } catch (error) {
      //console.log(error);
      return [];
    }
  }
);

export const fetchChatters = createAsyncThunk(
  "chatters",
  async ({ accessToken }: { accessToken: string }, { dispatch }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/chatters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + accessToken,
        },
      });
      const results = await response.json();
      dispatch(updateSecondaryChatter(results.users[0].chatterID));
      return results.users;
    } catch (error) {
      return [];
    }
  }
);

const USER_SLICE = createSlice({
  name: "users",
  initialState: <users>{
    users: [],
    chatters: [],
    loading: true,
    error: false,
    FriendRequests: [],
    Friends: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    updateLatestMessage: (state, action) => {
      const { messagerID, message, datetime, whoMessaged } = action.payload;
      state.chatters.forEach((element, index) => {
        if (element.chatterID === messagerID) {
          if (index === 0) {
            return;
          }
          state.chatters.splice(index, 1);
          state.chatters.splice(0, 0, {
            relation: "FRIEND",
            _id: element._id,
            chatterID: element.chatterID,
            message,
            whoMessaged,
            datetime,
          });
          return;
        }
      });
    },
    updateChatters: (state, action) => {
      state.chatters = action.payload;
      state.loading = false;
    },
    pushChatters: (state, action) => {
      if (action.payload instanceof Array) {
        state.chatters = [...action.payload, ...state.chatters];
      } else {
        const isPresent = state.chatters.some((item) => {
          return item.chatterID === action.payload.chatterID;
        });
        if (!isPresent) state.chatters.unshift(action.payload);
      }
    },

    pullChatters: (state, action) => {
      state.chatters.filter((item, index) => {
        if (item.chatterID === action.payload) {
          state.chatters.splice(index);
        }
      });
    },
    updateFriends: (state, action) => {
      state.Friends = action.payload;
    },
    updateFriendRequests: (state, action) => {
      state.FriendRequests = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchChatters.fulfilled, (state, action) => {
      state.loading = false;
      state.chatters = action.payload;
    });
  },
});

export const {
  updateUsers,
  setLoading,
  updateChatters,
  pullChatters,
  setError,
  updateFriends,
  updateFriendRequests,
  updateLatestMessage,
  pushChatters,
} = USER_SLICE.actions;
export default USER_SLICE.reducer;
