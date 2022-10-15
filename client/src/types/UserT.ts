export type UserT = {
  _id: string;
  username: string;
  options?: { colorTheme: string };
};

export type UserNewT = Omit<UserT, "id">;
