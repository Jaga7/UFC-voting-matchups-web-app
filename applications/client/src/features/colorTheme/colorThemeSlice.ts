import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { mode: '' };

export const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    setTheme(
      state: { mode: string | null },
      action: PayloadAction<string | null>
    ) {
      state.mode = action.payload;
    },
  },
  extraReducers: {},
});

export const { setTheme } = colorThemeSlice.actions;
export default colorThemeSlice.reducer;
