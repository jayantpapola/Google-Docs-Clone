import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUri, { client_url } from "../../config";
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
        return response.data;
      }
    } catch (err) {
      if (err.response.status == 401) {
        window.location.href = client_url + "/Login";
      }
    }
  }
);

export const getAllDocuments = createAsyncThunk("allDocs", async () => {
  try {
    const response = await axios.get(baseUri + "/getAllDocs", {
      headers: {
        authorization: localStorage.getItem("userToken"),
      },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
});

const docsReducer = createSlice({
  name: "docs",
  initialState: {
    isLoading: false,
    docId: null,
    isError: false,
    docs: [],
  },
  extraReducers: (builder) => {
    builder.addCase(createNewDocument.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.docId = action.payload._id;
    });
    builder.addCase(createNewDocument.rejected, () => {
      state.isLoading = false;
      state.isError = true;
    });
    // Get All Docs
    builder.addCase(getAllDocuments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.docs = action.payload;
    });
    builder.addCase(getAllDocuments.rejected, () => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default docsReducer.reducer;
