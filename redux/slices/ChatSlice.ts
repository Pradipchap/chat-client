import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface CurrentChatInterface {
  primaryChatter: string;
  secondaryChatter: string;
  chats: { message: string; isReceiver: boolean; time: Date; id: string }[];
}
export const updatePrimaryChatter = createAsyncThunk(
  "primaryChatter",
  async (primaryChatter: string) => {
    return primaryChatter;
  }
);
export const updateSecondaryChatter = createAsyncThunk(
  "secondaryChatter",
  async (secondaryChatter: string) => {
    return secondaryChatter;
  }
);

const CHAT_SLICE = createSlice({
  name: "chat",
  initialState: <CurrentChatInterface>{
    primaryChatter: "",
    secondaryChatter: "",
    chats: <
      { message: string; isReceiver: boolean; time: Date; id: string }[]
    >[],
  },
  reducers: {
    updateCurrentChatter: (state, action) => {
      state.primaryChatter = action.payload.primaryChatter;
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
  },
  extraReducers(builder) {
    builder.addCase(updatePrimaryChatter.fulfilled, (state, action) => {
      if (action.payload) {
        state.primaryChatter = action.payload;
      }
    });
    builder.addCase(updateSecondaryChatter.fulfilled, (state, action) => {
      if (action.payload) {
        state.secondaryChatter = action.payload;
      }
    });
  },
});

export const { updateCurrentChatter, updateChats, pushChat, pushMessage } =
  CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
