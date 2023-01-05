import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// dnd event action
export const updateDndStatus = createAsyncThunk(
  "UPDATE_DND_STATUS",
  (payload, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  dndStatus: [
    {
      isDragOver: false,
      position: "none",
      prevPosition: "none",
      startId: 0,
      endId: 0,
      startStatus: 0,
      endStatus: 0,
    },
  ],
  isLoading: false,
  error: null,
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateDndStatus.fulfilled, (state, action) => {
      state.dndStatus = [action.payload];
    });
  },
});

export default dndSlice.reducer;
