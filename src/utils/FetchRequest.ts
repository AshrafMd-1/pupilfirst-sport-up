import { request } from "./FetchPrototype.ts";

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
  return  await request(`/matches/${id}`, "GET");

};