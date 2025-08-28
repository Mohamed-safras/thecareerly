import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  logoPreview: string | null;
};

const initialState: UiState = {
  logoPreview: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLogoPreview: (state, action: PayloadAction<string | null>) => {
      state.logoPreview = action.payload;
    },
  },
});

export const { setLogoPreview } = uiSlice.actions;
export default uiSlice.reducer;
