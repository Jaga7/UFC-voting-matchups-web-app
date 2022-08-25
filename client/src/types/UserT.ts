export type UserT = {
  id: number;
  name: string;
  options?: { colorTheme: string };
};

export type UserNewT = Omit<UserT, "id">;
