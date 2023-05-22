import axios from "axios";

export const createMessageRecommandation = ({userEcole, Auteur, Sujet, Message}) =>{
    return axios
        .post(`${import.meta.env.VITE_DEV_BASE_URL}/MessageRecommandation`,{
            Ecole : userEcole,
            Auteur,
            Sujet,
            Message,
            StatutMessageRecommandationId : 1,
        })
        .then(res => res.data)
}