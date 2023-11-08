import { LoginReducerAction, LoginUser } from "../../../types/auth.ts";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContainer } from "../AuthContainer.tsx";

const reducer = (state: LoginUser, action: LoginReducerAction) => {
  switch (action.type) {
    case "email_change":
      return { ...state, email: action.value };
    case "password_change":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialState: LoginUser = {
  email: "",
  password: "",
};

const Login = () => {
  const [formDate, dispatch] = useReducer(reducer, initialState);
  const [remember, setRemember] = useState<boolean>(false);
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
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
      title={"Login"}
      description={"Sign in to your account to continue"}
      formData={formDate}
      remember={remember}
    >
      <label className="text-black text-xl ml-1 font-bold m-2" htmlFor="email">
        Email
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="text"
        name="email"
        id="email"
        value={formDate.email}
        placeholder="Email"
        onChange={(e) =>
          dispatch({
            type: "email_change",
            value: e.target.value,
          })
        }
      />
      <label
        className="text-black text-xl ml-1 font-bold m-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="password"
        name="password"
        id="password"
        value={formDate.password}
        placeholder="Password"
        onChange={(e) =>
          dispatch({
            type: "password_change",
            value: e.target.value,
          })
        }
      />
      <div className="flex bg-white  justify-start m-2 items-center">
        <input
          className="border  border-gray-400 rounded-lg p-2 "
          type="checkbox"
          name="remember"
          id="remember"
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        />
        <label className="text-black  ml-2" htmlFor="remember">
          Remember Me
        </label>
      </div>
    </AuthContainer>
  );
};

export default Login;
