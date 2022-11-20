import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../app/store";
import baseUrl from "../shared/baseUrl";
import { UserT } from "../types/UserT";

export const usersAPI = createApi({
  reducerPath: "userPath",
  baseQuery: fetchBaseQuery({
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
        url: `${baseUrl}/api/v1/users/${options.id}`,
        method: "PATCH",
        body: {
          ...options,
        },
      }),
    }),
  }),
});

export const { usePatchUserMutation } = usersAPI;
