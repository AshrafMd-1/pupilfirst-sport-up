import logo from "../../assets/logo/logo.png";
import React from "react";
import { LoginUser, RegisterUser } from "../../types/auth.ts";
import { createUser, loginUser } from "../../utils/FetchRequest.ts";
import { Link, useNavigate } from "react-router-dom";

export const AuthContainer = (props: {
  children: React.ReactNode;
  title: string;
  description: string;
  formData: RegisterUser | LoginUser;
  remember: boolean;
}) => {
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const nav = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    if (props.title === "Sign Up") {
      try {
        const response = await createUser(props.formData as RegisterUser);
        if (response.auth_token === undefined) {
          setError(response.errors[0]);
        } else {
          props.remember
            ? localStorage.setItem("auth_token", response.auth_token)
            : sessionStorage.setItem("auth_token", response.auth_token);
          nav("/dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await loginUser(props.formData as LoginUser);
        if (response.auth_token === undefined) {
          setError(response.errors[0]);
        } else {
          props.remember
            ? localStorage.setItem("auth_token", response.auth_token)
            : sessionStorage.setItem("auth_token", response.auth_token);
          nav("/dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center flex-col items-center  bg-yellow-50 py-5 ">
      <div className="flex justify-center items-center flex-col">
        <img src={logo} className=" w-2/12 " alt="logo" />
        <p className="text-3xl font-bold">
          <span className="text-green-400">Sport</span>
          <span className="text-blue-500">Up</span>
        </p>
      </div>
      <div className="flex flex-col justify-center w-10/12 lg:w-6/12 md:w-7/12  xl:w-4/12 bg-white rounded-lg  shadow-lg p-12 m-4">
        <div className="flex justify-center mb-4  flex-col">
          <h1 className="text-3xl text-black font-bold pb-1">{props.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">{props.description}</p>
        </div>
        {props.children}
        <div className="flex flex-col items-center mt-2">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold h-1/2 py-2 px-4 rounded flex items-center justify-center"
            onClick={handleSubmit}
          >
            {loading ? (
              props.title === "Sign Up" ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <span className="loading loading-dots loading-md"></span>
              )
            ) : props.title === "Sign Up" ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-xl font-bold mt-2">{error}</p>
          )}
          <Link
            className="text-blue-500 text-sm mt-2"
            to={props.title === "Sign Up" ? "/login" : "/signup"}
          >
            {props.title === "Sign Up"
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link
          className="bg-gray-800 hover:bg-black text-white text-2xl mt-2 py-2 px-4 rounded"
          to={"/"}
        >
          Back to Home
        </Link>
        <Link
          className="bg-gray-800 hover:bg-black text-white text-2xl mt-2 py-2 px-4 rounded"
          to={"/dashboard"}
        >
          Guest Login
        </Link>
      </div>
    </div>
  );
};
