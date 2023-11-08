type NameChange = {
  type: "name_change";
  value: string;
};

type EmailChange = {
  type: "email_change";
  value: string;
};

type PasswordChange = {
  type: "password_change";
  value: string;
};

export type SignupReducerAction = NameChange | EmailChange | PasswordChange;

export type LoginReducerAction = EmailChange | PasswordChange;

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  preferences: {
    sports?: string[];
    teams?: string[];
  };
};
