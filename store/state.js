import axios from "axios";
import { create } from "zustand";

export const useStore = create((set, get) => ({
  data: [],
  loading: true,
  getNews: (search = "") =>
    axios
      .get(`http://localhost:8080/posts${search}`)
      .then((res) => {
        set({ data: res.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
      }),
}));
