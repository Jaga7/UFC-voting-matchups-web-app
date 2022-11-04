import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { UserT } from "../../types/UserT";

import { RegisterOrLoginResponseT } from "../../types/AuthT";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: { username: string; password: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<RegisterOrLoginResponseT> | undefined =
        await axios.post(`/api/v1/auth/login`, loginData);
      if (!response?.data) {
        throw new Error("Incorrect username or password");
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

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData: { username: string; password: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<RegisterOrLoginResponseT> =
        await axios.post(`/api/v1/auth/register`, registerData);
      if (!response?.data) {
        throw new Error("Server error");
      } else {
        return response.data;
      }
    } catch (e) {
      console.log(`Error:${e}`);
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);
