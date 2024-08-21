import { createSlice } from "@reduxjs/toolkit";

export type callStatusType =
  | "incoming"
  | "requesting"
  | "ongoing"
  | "close"
  | "accepted"
  | "rejected"
  | "ended";
interface callDetailsInterface {
  callStatus: callStatusType;
  primaryChatter: string;
  secondaryChatter: string;
  secondaryChatterName: string;
  tab: Window | null;
  secondaryChatterImage: string;
}
const CALL_SLICE = createSlice({
  name: "call",
  initialState: <callDetailsInterface>{
    callStatus: "close",
    primaryChatter: "",
    secondaryChatter: "",
    secondaryChatterName: "",
    secondaryChatterImage: "",
    tab: null,
  },
  reducers: {
    requestCall: (state, action) => {
      state.callStatus = "requesting";
      state.secondaryChatter = action.payload.secondaryChatter;
      state.secondaryChatterName = action.payload.secondaryChatterName;
      state.secondaryChatterImage = action.payload.secondaryChatterImage;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    incomingCall: (state, action) => {
      state.callStatus = "incoming";
      state.secondaryChatter = action.payload._id;
      state.secondaryChatterName = action.payload.username;
      state.secondaryChatterImage = action.payload.image;
    },
    callAccepted: (state) => {
      state.callStatus = "accepted";
    },
    startCall: (state) => {
      state.callStatus = "ongoing";
    },
    rejectCall: (state) => {
      state.callStatus = "rejected";
    },
    closeCall: (state) => {
      state.callStatus = "close";
    },
    endCall: (state) => {
      state.callStatus = "ended";
    },
    updateCallDetails: (state, action) => {
      state.secondaryChatter = action.payload.secondaryChatter;
    },
  },
});

export const {
  setTab,
  closeCall,
  requestCall,
  callAccepted,
  startCall,
  updateCallDetails,
  rejectCall,
  incomingCall,
  endCall,
} = CALL_SLICE.actions;
export default CALL_SLICE.reducer;
