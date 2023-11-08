import { request } from "./FetchPrototype.ts";
import { ChangePassword, LoginUser, RegisterUser } from "../types/auth.ts";
import { Preference } from "../types/data.ts";

export const getArticles = async () => {
  return await request("/articles", "GET");
};

export const getArticleDetail = async (id: number) => {
  return await request(`/articles/${id}`, "GET");
};

export const getMatches = async () => {
  return await request("/matches", "GET");
};

export const getMatchDetail = async (id: number) => {
  return await request(`/matches/${id}`, "GET");
};

export const createUser = async (data: RegisterUser) => {
  return await request("/users", "POST", data);
};

export const loginUser = async (data: LoginUser) => {
  return await request("/users/sign_in", "POST", data);
};

export const getUser = async () => {
  return await request("/user", "GET");
};

export const logoutUser = () => {
  sessionStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token");
  window.location.href = "/";
};

export const sendPreferences = async (data: Preference) => {
  return await request("/user/preferences", "PATCH", data);
};

export const changePassword = async (data: ChangePassword) => {
  return await request("/user/password", "PATCH", data);
};
