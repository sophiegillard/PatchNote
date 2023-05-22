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


// Get only the modules of the user
export const getUsersModules = async (userId) => {
    const { data } = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/usersModules?userId=${userId}`);
    const transformedData = data.map((module) => ({
        id: module.id,
        title: t(`filters.filters_modules.list.${module.nom}`),
    }));
    return transformedData;
}
//Query to call user's modules and handle datas.
export const useUsersModulesQuery = (userId) => {
    return useQuery(
        'usersModules',
        () => getUsersModules(userId));
}

