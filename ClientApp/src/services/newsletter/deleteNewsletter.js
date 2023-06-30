import axios from "axios";

export const deleteNewsletterById = async (id) => {
    return axios
        .delete(`${import.meta.env.VITE_DEV_BASE_URL}/newsletter/delete/${id}`)
        .then(response =>response.data)
}