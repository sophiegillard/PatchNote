import {useInfiniteQuery, useQuery} from "react-query";
import {
    getAllArticles,
    getAllArticlesLoadMore,
} from "../articles/getArticlesQueries.js";

export const articlesQuery = (categoryId, moduleId, startDate, endDate, pageNumber, filterType, sortColumn, sortDirection) => {
    return useQuery(
        ['articles', categoryId, moduleId, startDate, endDate, pageNumber, filterType, sortColumn, sortDirection],
        () => getAllArticles(categoryId, moduleId, startDate, endDate, pageNumber, filterType, sortColumn, sortDirection),
        { select: data => data.articles });
}

export const articlePaginationQuery = (categoryId, moduleId, startDate, endDate, page, filterType, sortColumn, sortDirection) => {
    return useQuery(
        ['articles_pagination',categoryId, moduleId, startDate, endDate, page, filterType, sortColumn, sortDirection],
        () => getAllArticles(categoryId, moduleId, startDate, endDate, page, filterType, sortColumn, sortDirection),
        { select: data => data.pagination }
    )
}

export const useArticleLoadMoreQuery = (categoryId, moduleId, startDate, endDate, search, userId) => {
    return useInfiniteQuery({
        queryKey: ["articleLoadMore", categoryId, moduleId, startDate, endDate, search, userId],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({pageParam = 1 }) => getAllArticlesLoadMore(categoryId, moduleId, startDate, endDate, search, userId, pageParam),
    })}
