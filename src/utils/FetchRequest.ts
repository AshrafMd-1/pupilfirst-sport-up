import { request } from "./FetchPrototype.ts";
import { LoginUser, RegisterUser } from "../types/auth.ts";

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
  return await request("/users", "GET");
};
