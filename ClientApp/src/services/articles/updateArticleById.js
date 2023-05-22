import axios from "axios";


export const updateArticleById = async ({ id, IsBrouillon, ...data }) => {
    let articleData = { ...data };
    if (IsBrouillon) {
        articleData = { ...articleData, IsBrouillon: 1 };
    } else {
        articleData = { ...articleData, IsBrouillon: 0 };
    }
    const response = await axios.put(
        `${import.meta.env.VITE_DEV_BASE_URL}/article/update/${id}`,
        articleData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};

export const updateArticleNewsletterIdById = async ({ id, newsletterId }) => {
    return await axios.put(
        `${import.meta.env.VITE_DEV_BASE_URL}/article/updateNewsletterId/${id}`,
        {newsletterId : newsletterId}
    );
};




