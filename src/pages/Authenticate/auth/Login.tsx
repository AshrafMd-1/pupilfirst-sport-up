import {LoginReducerAction, LoginUser} from "../../../types/auth.ts";
import {useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContainer} from "../AuthContainer.tsx";

const reducer = (state: LoginUser, action: LoginReducerAction) => {
  switch (action.type) {
    case "username_change":
      return { ...state, username: action.value };
    case "password_change1":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialState: LoginUser = {
  username: "",
  password: "",
};

const Login = () => {
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
  }, [currentUser]);

  return (
    <AuthContainer
      title={"Login"}
      description={"Sign in to your account to continue"}
      formData={formDate}
      remember={remember}
    >
      <label
        className="text-black text-xl ml-1 font-bold m-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="text"
        name="username"
        id="username"
        value={formDate.username}
        placeholder="Username"
        onChange={(e) =>
          dispatch({
            type: "username_change",
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
            type: "password_change1",
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