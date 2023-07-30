import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUri from "../../config";

export const signUp = createAsyncThunk(
  "signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUri}/signUp`, data);
      if (response.status == 200) {
        localStorage.setItem("userToken", response.data.token);
        return response.data;
      } else if (response.status == 204) {
        return { error: "Email Already Exist" };
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const logIn = createAsyncThunk(
  "logIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUri}/logIn`, data);
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("userToken", response.data.token);
        return response.data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    authorized: false,
    data: {
      userName: "",
      userEmail: "",
    },
    isError: false,
    error: {
      message: "",
      email: "",
      password: "",
    },
  },
  extraReducers: (builder) => {
    // Sign Up
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.error) {
        state.isError = true;
        state.error.message = action.payload.error;
      } else {
        state.data.userName = action.payload.data.name;
        state.data.userEmail = action.payload.data.email;
        state.authorized = true;
        state.isError = false;
        state.error.message = "";
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Log In
    builder.addCase(logIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.error) {
        if (action.payload.error.password) {
          state.isError = true;
          state.error.password = action.payload.error.password;
        } else {
          state.isError = true;
          state.error.email = action.payload.error.email;
        }
      } else {
        state.data.userName = action.payload.data.name;
        state.data.userEmail = action.payload.data.email;
        state.authorized = true;
        state.isError = false;
        state.error.message = "";
      }
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authReducer.reducer;
