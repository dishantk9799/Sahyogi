import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  commandOpen: false,
  draftTitle: "",
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCommandOpen(state, action) {
      state.commandOpen = action.payload;
    },
    setDraftTitle(state, action) {
      state.draftTitle = action.payload;
    },
  },
});
export const { setCommandOpen, setDraftTitle } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
