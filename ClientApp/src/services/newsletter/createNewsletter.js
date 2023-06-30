import axios from "axios";

export const createNewsletter = () =>{
    // Set a default date to 15 days from now
    const today = new Date();
    const datePublication = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10);

    // Creates a newsletter with the default date and Id but no other information yet
    return axios
        .post(`${import.meta.env.VITE_DEV_BASE_URL}/Newsletter`,{
            datePublication : datePublication,
            isBrouillon : 1,
        })
        .then(res => {
            const newsletterId = res.data.id;
            window.location.replace(`/newsletter/update/${newsletterId}`)
        });
}