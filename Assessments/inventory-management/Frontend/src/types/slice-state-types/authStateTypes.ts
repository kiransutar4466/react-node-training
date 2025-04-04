export type authStateType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  userDetails: jwtPayloadType | null;
};

export type jwtPayloadType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  inventoryId: string;
  inventoryName: string;
};

export type authPayloadType = {
  formData: loginFormType;
  navigate: Function;
};

export type loginFormType = { email: string; password: string }