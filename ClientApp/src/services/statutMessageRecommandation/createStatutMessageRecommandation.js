import axios from "axios";


export const createStatutMessageRecommandation = ({nomStatut, color}) =>{
    return axios
        .post(`${import.meta.env.VITE_DEV_BASE_URL}/StatutMessageRecommandation`,{
            NomStatut : nomStatut,
            Color : color,
        })
        .then(res => res.data)
}
