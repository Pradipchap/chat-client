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
  },
  reducers: {
    requestCall: (state) => {
      state.callStatus = "requesting";
    },
    incomingCall: (state, action) => {
      state.callStatus = "incoming";
      state.secondaryChatterName = action.payload.name;
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
    endCall:(state)=>{
      state.callStatus="ended"
    },
    updateCallDetails: (state, action) => {
      state.primaryChatter = action.payload.primaryChatter;
      state.secondaryChatter = action.payload.secondaryChatter;
    },
  },
});

export const {
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
