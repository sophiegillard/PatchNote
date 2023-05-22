import axios from "axios";

export const createArticle = ({TitreFR ,
                              ContenuFR ,
                              TitreEN ,
                              ContenuEN ,
                              TitreNL ,
                              ContenuNL ,
                              Version,
                              DatePublication,
                              DateModification,
                              CategorieId ,
                              AuteurId,
                              ModuleId,
                              IsBrouillon}) =>{
    return axios
        .post(`${import.meta.env.VITE_DEV_BASE_URL}/article`,{
            TitreFR,
            ContenuFR,
            TitreEN,
            ContenuEN,
            TitreNL,
            ContenuNL,
            Version,
            DatePublication,
            DateModification,
            CategorieId ,
            AuteurId,
            ModuleId,
            IsBrouillon
        })
        .then(res => res.data)
}
