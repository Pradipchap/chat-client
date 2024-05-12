import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../../interfaces/componentInterfaces"
interface toast {
  isOpen: boolean;
  message: string;
  type: ToastType;
}

const toastSlice = createSlice({
  initialState: <toast>{
    isOpen: false,
    type: "success",
    message: "",
  },
  name: "toast",
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = toastSlice.actions;
export const toastState = (state: RootState) => state.toast;
export default toastSlice.reducer;
