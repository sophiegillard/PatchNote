import axios from "axios";
import {useQuery} from "react-query";

export const getAllNewsletters = async (page, newsletterState, sortColumn, sortDirection) => {
    const limit = 10;
    const params = {
        Limit: limit,
        Page: page,
        NewsletterState: newsletterState,
        SortColumn: sortColumn,
        SortDirection: sortDirection
    };
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/newsletter`, { params })
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        });
};

export const useAllNewsletterQuery = (page, newsletterState, sortColumn, sortDirection) => {
    return useQuery(
        ['newsletters', page, newsletterState, sortColumn, sortDirection],
        () => getAllNewsletters(page, newsletterState, sortColumn, sortDirection),
        {
            select: data => data,
            onError: error => console.error(error),
        }
    );
};

export const getNewsletterById = async (id) => {
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/newsletter/${id}`)
        .then(response => response.data)
}

export const useNewsletterByIdQuery = (id) => {
    return useQuery(
        ['newsletter', id],
        () => getNewsletterById(id),
        {
            select: data => data.newsletter,
            onError: error => console.error(error),
        }
    );
};