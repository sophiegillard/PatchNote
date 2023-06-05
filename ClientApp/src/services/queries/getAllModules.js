import axios from "axios";
import {useQuery} from "react-query";
import {t} from "i18next";

//Get ALL modules with the right translation yet
export const getAllModules = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/Module`);
    const transformedData = data.map((module) => ({
        id: module.id,
        title: t(`filters.filters_modules.list.${module.nom}`),
    }));
    return transformedData;
}
//Query to call all modules and handle datas.
export const useAllModulesQuery = () => {
    return useQuery('modules', getAllModules);
}


