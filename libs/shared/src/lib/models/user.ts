/* eslint-disable @typescript-eslint/no-empty-interface */
export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  isAdmin?: boolean;
  order?: string;
}

export interface ResUser {
  success?: boolean;
  users: User[];
}

export interface ResOneUser {
  success?: boolean;
  user: User;
}
