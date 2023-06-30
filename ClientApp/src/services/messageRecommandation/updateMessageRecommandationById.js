import axios from "axios";


export const updateMessageRecommandationById = async ({ id, statutMessageRecommandationId }) => {
    return await axios.put(
        `${import.meta.env.VITE_DEV_BASE_URL}/messageRecommandation/updateStatut/${id}`,
        {statutMessageRecommandationId : statutMessageRecommandationId}
    );
};





