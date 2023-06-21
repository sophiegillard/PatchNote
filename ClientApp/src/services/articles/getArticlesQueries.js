import axios from "axios";

//Get articles for home page with load more option
export const getAllArticlesLoadMore = async (categoryId, moduleId, startDate, endDate, search, _page) => {
    const limit = 10;
    const params = {
        _limit : limit,
        _page: _page,
        CategoryId: categoryId,
        ModuleId: moduleId,
        StartDate: startDate,
        EndDate: endDate,
        Search: search
    };
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/article/details/loadMore`, {params: params})
        .then(response => {
            const totalCount = response.data.totalCount;
            const totalPages = Math.ceil(totalCount / limit);
            const nextPage = _page < totalPages ? _page + 1 : undefined;
            const previousPage = _page > 1 ? _page - 1 : undefined;

            return {
                articles: response.data,
                nextPage,
                previousPage,
                totalCount,
            };
        });
}

//get articles for articles handling with pagination
export const getAllArticles = async (categoryId, moduleId, startDate, endDate, page, filterType, sortColumn, sortDirection) => {
    const params = {
        CategoryId: categoryId,
        ModuleId: moduleId,
        StartDate: startDate,
        EndDate: endDate,
        Page: page,
        FilterType: filterType,
        SortColumn: sortColumn,
        SortDirection: sortDirection
    };
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/article/details`, {params: params})
        .then(response =>response.data)
}

export const getDetailedArticleById = async (id) => {
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/article/details/${id}`)
        .then(response =>response.data)
}


export const getArticleNewsletterId = async () => {
    return axios
        .get(`${import.meta.env.VITE_DEV_BASE_URL}/article/newsletterId`)
        .then(response =>response.data)
}


export const toggleIsArchivedById = async (id) => {
  return axios
      .put(`${import.meta.env.VITE_DEV_BASE_URL}/article/archive/${id}`)
      .then(response => {
            response.data;
            console.log("success" + response.data)
          }
      )
}