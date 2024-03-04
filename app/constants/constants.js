export const API_URL = "http://127.0.0.1:3001";

export const authorization = {
  headers: {
    authorization: JSON.parse(localStorage.getItem("user")),
  },
};
