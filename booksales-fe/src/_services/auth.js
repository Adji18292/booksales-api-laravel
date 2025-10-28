import API from "../_api";

export const login = async (credentials) => {
  const { data } = await API.post("/login", credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};