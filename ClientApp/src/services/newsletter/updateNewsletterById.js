import axios from "axios";

export const updateNewsletterById = async ({ id, IsBrouillon, ...data }) => {
    let articleData = { ...data };
    if (IsBrouillon) {
        articleData = { ...articleData, IsBrouillon: 1 };
    } else {
        articleData = { ...articleData, IsBrouillon: 0 };
    }
    const response = await axios.put(
        `${import.meta.env.VITE_DEV_BASE_URL}/newsletter/update/${id}`,
        articleData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};