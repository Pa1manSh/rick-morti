import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = (page = 1, name = "", status = "") => {
  const params = new URLSearchParams({ page });
  if (name) params.append("name", name);
  if (status) params.append("status", status);

  const url = `${API_URL}?${params.toString()}`;
  console.log("Fetching data from URL:", url);

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      console.error("Error details:", error.response);
      throw error;
    });
};
