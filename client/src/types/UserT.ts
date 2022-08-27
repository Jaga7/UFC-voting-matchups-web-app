export type UserT = {
  id: number;
  username: string;
  options?: { colorTheme: string };
};

export type UserNewT = Omit<UserT, "id">;
