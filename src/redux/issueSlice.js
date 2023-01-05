import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { issueAPI } from "../api/api";

export const getIssues = createAsyncThunk(
  "GET_ALL",
  async (payload, thunkAPI) => {
    try {
      const { data } = await issueAPI.getIssues();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addIssue = createAsyncThunk(
  "ADD_ISSUE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await issueAPI.createIssue(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "UPDATE_ISSUE",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      console.log("작동작동작동작동작동작동작동작동작동작동작동");
      const response = await issueAPI.updateIssue(payload.id, payload);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteIssue = createAsyncThunk(
  "DELETE_ISSUE",
  async (payload, thunkAPI) => {
    try {
      await issueAPI.deleteIssue(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  issue: [],
  isLoading: false,
  error: null,
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIssues.pending, (state, action) => {});
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.issue = action.payload;
    });
    builder.addCase(getIssues.rejected, (state, action) => {});
    builder.addCase(addIssue.pending, (state, action) => {});
    builder.addCase(addIssue.fulfilled, (state, action) => {
      state.issue.push(action.payload);
    });
    builder.addCase(addIssue.rejected, (state, action) => {});
    builder.addCase(updateIssue.pending, (state, action) => {});
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      console.log(current(state));
      console.log(action);
      const newState = state.issue.map((item) =>
        action.meta.arg.id === item.id
          ? {
              ...item,
              sortId: action.meta.arg.sortId,
              title: action.meta.arg.title,
              content: action.meta.arg.content,
              deadline: action.meta.arg.deadline,
              status: action.meta.arg.status,
              name: action.meta.arg.name,
            }
          : item
      );
      state.issue = newState.sort((a, b) => a.sortId - b.sortId);
      // state.issue.push(action.payload);
    });
    builder.addCase(updateIssue.rejected, (state, action) => {});
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      const newState = state.issue.filter((item) => item.id !== action.payload);
      state.issue = newState;
    });
  },
});

export default issueSlice.reducer;
