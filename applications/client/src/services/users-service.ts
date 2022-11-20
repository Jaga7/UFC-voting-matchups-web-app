import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../app/store";
import { UserT } from "../types/UserT";
import baseUrl from "../shared/baseUrl";

export const usersAPI = createApi({
  reducerPath: "userPath",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    patchUser: build.mutation<UserT, { id: string; [key: string]: any }>({
      query: (options) => ({
        url: `/api/v1/users/${options.id}`,
        method: "PATCH",
        body: {
          ...options,
        },
      }),
    }),
  }),
});

export const { usePatchUserMutation } = usersAPI;
