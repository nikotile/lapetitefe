import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getMangas() {
    return apiClient.get('entries');
  },
  getTags() {
    return apiClient.get('tags');
  },
  getMangaDetails(id) {
    return apiClient.get(`entry/${id}`);
  },
  getMangaChapter(id, chapter) {
    return apiClient.get(`entry/${id}/${chapter}`);
  },
  getMangaSearch(query) {
    return apiClient.get(`search?title=${query}`);
  }
};
