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
    secondaryChatterRelation: "NORMAL",
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
      console.log(action.type);
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
      console.log(action.payload.relation);
      state.secondaryChatterRelation = action.payload.relation;
      console.log(typeof state.secondaryChatterImage);
      console.log(typeof action.payload.image !== "undefined");
      if (typeof action.payload.image !== "undefined") {
        state.secondaryChatterImage = action.payload.image;
      }
      state.secondaryChatter = action.payload.secondaryChatter;
    },
    updateSeenStatus: (state, action) => {
      state.isSeen = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateSecondaryChatter.fulfilled, (state, action) => {
      if (action.payload) {
        state.secondaryChatter = action.payload;
        console.log("first");
        // state.secondaryChatterRelation = "FRIEND";
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
} = CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
