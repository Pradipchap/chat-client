import { createSlice } from "@reduxjs/toolkit";

interface wsInterface {
  isActive: boolean;
}

const WS_SLICE = createSlice({
  name: "call",
  initialState: <wsInterface>{
    isActive: false,
  },
  reducers: {
    setWsStatus: (state) => {
      state.isActive = true;
    },
  },
});

export const { setWsStatus } = WS_SLICE.actions;
export default WS_SLICE.reducer;
