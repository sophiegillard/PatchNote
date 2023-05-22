import axios from "axios";
import {t} from "i18next";
import {useQuery} from "react-query";

export const getAllCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/Categorie`);
    const transformedData = data.map((category) => ({
        id: category.id,
        name: category.name,
        title: t(`filters.filters_category.list.${category.name}`),
    }));
    return transformedData;
}


export const useAllCategoriesQuery = () => {
    return useQuery('categories', getAllCategories);
}