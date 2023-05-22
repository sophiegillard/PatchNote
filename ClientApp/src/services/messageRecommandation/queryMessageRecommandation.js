import axios from "axios";
import {useInfiniteQuery, useQuery} from "react-query";

export const getMessageRecommandation = (statutMessageRecommandationId, isRead, search, _page) => {
    const limit = 2;
    const params =
    {   _page: _page,
        statutMessageRecommandationId: statutMessageRecommandationId,
        isRead: isRead,
        search : search
    };

    return axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/MessageRecommandation`, {params: params})
        .then(response => {
            const totalCount = response.data.totalCount;
            const totalPages = Math.ceil(totalCount / limit);
            const nextPage = _page < totalPages ? _page + 1 : undefined;
            const previousPage = _page > 1 ? _page - 1 : undefined;

            return {
                messages: response.data,
                nextPage,
                previousPage,
                totalCount,
            };
        });
}


export const useAllMessageRecommandation = (statutMessageRecommandationId, isRead, search) => {
    return useInfiniteQuery({
        queryKey: ["messages"],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({pageParam = 1 }) => getMessageRecommandation(statutMessageRecommandationId, isRead, search, pageParam),
    })}