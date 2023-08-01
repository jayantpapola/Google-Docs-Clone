import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUri from "../../config";
import axios from "axios";

export const createNewDocument = createAsyncThunk(
  "newDoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUri + "/createNewDocument", {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      });
      if (response.status == 200) {
        return response.data.docId;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const docsReducer = createSlice({
  name: "docs",
  initialState: {
    isLoading: false,
    docId: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewDocument.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewDocument.fulfilled, (state, action) => {
      console.log("Doc Reducer", action.payload);
      state.isLoading = false;
      state.docId = action.payload.docId;
    });
    builder.addCase(createNewDocument.rejected, () => {
      state.isError = true;
    });
  },
});

export default docsReducer.reducer;
