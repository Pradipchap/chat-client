import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Vite from "../../src/assets/avatar.svg";
import { UserRelation } from "../../interfaces/dataInterfaces";
interface CurrentChatInterface {
  primaryChatter: string;
  secondaryChatter: string;
  secondaryChatterName: string;
  secondaryChatterImage: string;
  secondaryChatterRelation: UserRelation;
  isSeen: boolean;
  chats: { message: string; isReceiver: boolean; time: Date; id: string }[];
}
export const updateSecondaryChatter = createAsyncThunk(
  "secondaryChatter",
  async (secondaryChatter: string) => {
    return secondaryChatter;
  }
);

const CHAT_SLICE = createSlice({
  name: "chat",
  initialState: <CurrentChatInterface>{
    secondaryChatter: "",
    secondaryChatterName: "",
    secondaryChatterImage: Vite,
    secondaryChatterRelation: null,
    isSeen: false,
    chats: <
      { message: string; isReceiver: boolean; time: Date; id: string }[]
    >[],
  },
  reducers: {
    updateCurrentChatter: (state, action) => {
      state.secondaryChatter = action.payload.secondaryChatter;
    },
    updateChats: (state, action) => {
      state.chats = action.payload;
    },
    pushChat: (state, action) => {
      state.chats.unshift(...action.payload);
    },
    pushMessage: (state, action) => {
      state.chats.push(...action.payload);
    },
    updateChatterDetails: (state, action) => {
      state.secondaryChatterName = action.payload.name;
      state.secondaryChatterRelation = action.payload.relation;
      if (typeof action.payload.image !== "undefined") {
        state.secondaryChatterImage = action.payload.image;
      }
      state.secondaryChatter = action.payload.secondaryChatter;
    },
    updateSeenStatus: (state, action) => {
      state.isSeen = action.payload;
    },
    updateRelation: (state, action) => {
      state.secondaryChatterRelation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateSecondaryChatter.fulfilled, (state, action) => {
      if (action.payload) {
        state.secondaryChatter = action.payload;
      }
    });
  },
});

export const {
  updateCurrentChatter,
  updateChats,
  pushChat,
  pushMessage,
  updateChatterDetails,
  updateSeenStatus,
  updateRelation,
} = CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
