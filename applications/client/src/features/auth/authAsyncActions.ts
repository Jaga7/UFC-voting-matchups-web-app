import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { RegisterOrLoginResponseT } from "../../types/AuthT";
import baseUrl from "../../shared/baseUrl";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: { username: string; password: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<RegisterOrLoginResponseT> | undefined =
        await axios.post(`${baseUrl}/api/v1/auth/login`, loginData);
      if (!response?.data) {
        throw new Error("Incorrect username or password");
      } else {
        return response.data;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.response?.data.msg);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData: { username: string; password: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<RegisterOrLoginResponseT> =
        await axios.post(`${baseUrl}/api/v1/auth/register`, registerData);
      if (!response?.data) {
        throw new Error("Server error");
      } else {
        return response.data;
      }
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);
