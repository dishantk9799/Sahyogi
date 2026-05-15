import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  commandOpen: boolean;
  draftTitle: string;
};

const initialState: UiState = {
  commandOpen: false,
  draftTitle: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCommandOpen(state, action: PayloadAction<boolean>) {
      state.commandOpen = action.payload;
    },
    setDraftTitle(state, action: PayloadAction<string>) {
      state.draftTitle = action.payload;
    },
  },
});

export const { setCommandOpen, setDraftTitle } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
