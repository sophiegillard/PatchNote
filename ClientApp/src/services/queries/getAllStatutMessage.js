import axios from "axios";
import {useQuery} from "react-query";

export const getAllStatutMessage = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/StatutMessageRecommandation`);
    const transformedData = data.map((statutMessage) => ({
        id: statutMessage.id,
        name: statutMessage.nomStatut,
        color: statutMessage.color,
    }));
    return transformedData;
}


export const useAllStatutMessageQuery = () => {
    return useQuery(['statutMessages'], getAllStatutMessage);
}