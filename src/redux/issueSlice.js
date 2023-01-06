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

export const forceLoading = createAsyncThunk(
  "FORCE_LOADING_AFTER_REQUEST",
  async (payload, thunkAPI) => {
    return thunkAPI.fulfillWithValue();
  }
);

const initialState = {
  issue: [],
  dndStatus: {
    isDragOver: false,
    position: "none",
    prevPosition: "none",
    startId: 0,
    endId: 0,
    startStatus: 0,
    endStatus: 0,
  },
  isLoading: false,
  error: null,
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.issue = action.payload;
    });
    builder.addCase(getIssues.rejected, (state, action) => {
      state.error = "알 수 없는 오류. 새로고침 요망";
    });
    builder.addCase(addIssue.fulfilled, (state, action) => {
      state.issue.push(action.payload);
    });
    builder.addCase(addIssue.rejected, (state, action) => {
      state.error = "알 수 없는 오류. 새로고침 요망";
    });
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      console.log(current(state));
      console.log(action);
      let newState = state.issue.filter(
        (item) => item.id !== action.payload.id
      );
      // let newState = state.issue.map((item) =>
      //   action.meta.arg.id === item.id
      //     ? {
      //         ...item,
      //         sortId: action.payload.sortId,
      //         title: action.payload.title,
      //         content: action.payload.content,
      //         deadline: action.payload.deadline,
      //         status: action.payload.status,
      //         name: action.payload.name,
      //       }
      //     : item
      // );
      newState.push(action.payload);
      state.issue = newState.sort((a, b) => a.sortId - b.sortId);
    });
    builder.addCase(updateIssue.rejected, (state, action) => {
      state.error = "알 수 없는 오류. 새로고침 요망";
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      const newState = state.issue.filter((item) => item.id !== action.payload);
      state.issue = newState;
    });
    builder.addCase(deleteIssue.rejected, (state, action) => {
      state.error = "알 수 없는 오류. 새로고침 요망";
    });
    builder.addCase(forceLoading.fulfilled, (state, action) => {
      state.isLoading = state.isLoading ? false : true;
    });
  },
});

export default issueSlice.reducer;
