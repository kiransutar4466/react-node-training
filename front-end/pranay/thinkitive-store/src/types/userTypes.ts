export type userType = {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  phone?: number;
  token?: string;
};

export type userStateType = {
  user: userType;
  isLoading: boolean;
  error: null | string;
};

export type authStateType = {
  user: userType;
  isLoading: boolean;
  error: null | string;
  isLoggedIn: boolean;
};
