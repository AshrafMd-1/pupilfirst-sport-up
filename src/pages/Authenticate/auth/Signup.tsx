import { RegisterUser, SignupReducerAction } from "../../../types/auth.ts";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContainer} from "../AuthContainer.tsx";

const reducer = (state: RegisterUser, action: SignupReducerAction) => {
  switch (action.type) {
    case "username_change":
      return { ...state, username: action.value };
    case "email_change":
      return { ...state, email: action.value };
    case "password_change1":
      return { ...state, password1: action.value };
    case "password_change2":
      return { ...state, password2: action.value };
    default:
      return state;
  }
};

const initialState: RegisterUser = {
  username: "",
  email: "",
  password1: "",
};
const Signup = () => {
  const [formDate, dispatch] = useReducer(reducer, initialState);
  const [remember, setRemember] = useState<boolean>(false);
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (user) {
      return user;
    }
    return null;
  });

  const nav = useNavigate();

  useEffect(() => {
    if (currentUser) {
      nav("/dashboard");
    }
  }, [currentUser, nav]);

  return (
    <AuthContainer
      title={"Sign Up"}
      description={"Create an account to continue"}
      formData={formDate}
      remember={remember}
    >
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="username"
      >
        Name
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={formDate.username}
        className="border border-gray-400 rounded-lg p-2"
        onChange={(e) =>
          dispatch({
            type: "username_change",
            value: e.target.value,
          })
        }
      />
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formDate.email}
        onChange={(e) => {
          dispatch({
            type: "email_change",
            value: e.target.value,
          });
        }}
      />
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="password1"
      >
        Password
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="password"
        name="password1"
        id="password1"
        placeholder="Password"
        value={formDate.password1}
        onChange={(e) => {
          dispatch({
            type: "password_change1",
            value: e.target.value,
          });
        }}
      />
      <div className="flex justify-start m-2 items-center">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          type="checkbox"
          name="remember"
          id="remember"
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        />
        <label className="text-grey-400   ml-2" htmlFor="remember">
          Remember Me
        </label>
      </div>
    </AuthContainer>
  );
};

export default Signup;
