import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { UserT } from "../../types/UserT";

import api from "../../shared/utils/api";
import { RegisterResponseT } from "../../types/AuthT";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: { username: string; password: string }, thunkAPI) => {
    const { username, password } = loginData;
    try {
      // tutaj będę chciał chyba token jeszcze, czyli stworzyć typ loginResponseT i tam że UserT oraz token
      const response: AxiosResponse<UserT[]> | undefined = await axios.post(
        `/v1/auth/login`,
        loginData
      );
      if (!response?.data.length) {
        throw new Error("Incorrect username or password");
      } else {
        const user = response.data[0];
        console.log("OOOO", user);
        return user;
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

export const loginUserByToken = createAsyncThunk(
  "auth/loginUserByToken",
  async (id: number, thunkAPI) => {
    try {
      const response: AxiosResponse<UserT> = await api.get(`users/${id}`);
      if (!response.data) {
        throw new Error("Unexpected error occured");
      } else {
        const user = response.data;
        return user;
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
    const { username, password } = registerData;
    try {
      // tutaj będę chciał chyba token jeszcze, czyli stworzyć typ registerResponseT i tam że UserT oraz token
      // const response: AxiosResponse<UserT[]> | undefined = await api.post(

      const response: AxiosResponse<RegisterResponseT> = await axios.post(
        `/api/v1/auth/register`,
        registerData
      );
      // const { user, token } = response?.data;
      // console.log(`this is the response: ${response?.data[0]}`);
      // if (!response?.data.length) {
      if (!response?.data) {
        throw new Error("Server error");
      } else {
        // const user = response.data[0];
        // return user;
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
