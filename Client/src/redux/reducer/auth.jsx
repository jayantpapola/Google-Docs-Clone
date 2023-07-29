import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUri from "../../config";

export const signUp = createAsyncThunk("signUp", async (data) => {
  const response = await axios.post(`${baseUri}/signUp`, data);
  console.log(response);
});

const authReducer = createSlice({
  name: "auth",
  initialState: {
    userName: "",
    userEmail: "",
    userPassword: "",
  },
  reducers: {
    // setAuth:(state)
  },
  extraReducers: (builder) => {},
});
