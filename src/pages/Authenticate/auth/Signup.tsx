import { RegisterUser, SignupReducerAction } from "../../../types/auth.ts";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContainer } from "../AuthContainer.tsx";
import { useTranslation } from "react-i18next";

const reducer = (state: RegisterUser, action: SignupReducerAction) => {
  switch (action.type) {
    case "name_change":
      return { ...state, name: action.value };
    case "email_change":
      return { ...state, email: action.value };
    case "password_change":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialState: RegisterUser = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
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
  const { t } = useTranslation();

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
      <label className="text-black text-xl ml-1 font-bold m-2" htmlFor="name">
        {t("Name")}
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder={t("Name")}
        value={formDate.name}
        className="border border-gray-400 bg-white rounded-lg p-2"
        onChange={(e) =>
          dispatch({
            type: "name_change",
            value: e.target.value,
          })
        }
      />
      <label className="text-black text-xl ml-1 font-bold m-2" htmlFor="email">
        {t("Email")}
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
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
        className="text-black text-xl ml-1 font-bold m-2"
        htmlFor="password"
      >
        {t("Password")}
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="password"
        name="password"
        id="password1"
        placeholder="Password"
        value={formDate.password}
        onChange={(e) => {
          dispatch({
            type: "password_change",
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
        <label className="text-black   ml-2" htmlFor="remember">
          Remember Me
        </label>
      </div>
    </AuthContainer>
  );
};

export default Signup;
