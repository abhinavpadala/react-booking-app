import bearerToken from "../config";
const fetch = require("node-fetch");

const getHeaders = () => {
  const headers = new fetch.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + bearerToken);
  return headers;
};

export { getHeaders };
