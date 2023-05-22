import axios from "axios";

export const deleteArticleById = async (id) => {
    return axios
        .delete(`${import.meta.env.VITE_DEV_BASE_URL}/article/delete/${id}`)
        .then(response =>response.data)
  }