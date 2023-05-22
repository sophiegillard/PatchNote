import axios from 'axios';
import {useQuery} from "react-query";
import {getDateDDMMYYYY} from "@/Utils/convertDate.js";


export const getRepositoryAuthors = async () => {
    const owner = 'APKIOSK';
    const repo = 'APSchool';
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    try {
        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const authorIds = new Set();
        const authors = [];

        data.forEach((item) => {
            const { login } = item.author;
            const { name } = item.commit.author;

            if (!authorIds.has(login)) {
                authorIds.add(login);
                authors.push({ authorLogin: login, authorName: name});
            }
        });

        return authors;


    } catch (error) {
        console.log(error);
    }
};

export const useAllRepoAuthorsQuery = () => {
    return useQuery('repoAuthors', getRepositoryAuthors);
}