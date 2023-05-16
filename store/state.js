import axios from "axios";
import { create } from "zustand";

export const useStore = create((set, get) => ({
    data: [],
    loading: true,
    getNews: () =>
        axios
            .get("http://localhost:8080/posts")
            .then((res) => {
                set({ data: res.data, loading: false });
            })
            .catch((error) => {
                console.log(error);
            }),
}));
