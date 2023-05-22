import axios from "axios";

export const deleteStatutMessageRecommandationById = async (id) => {
    return axios
        .delete(`${import.meta.env.VITE_DEV_BASE_URL}/statutMessageRecommandation/delete/${id}`)
        .then(response =>response.data)
}
