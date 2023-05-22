import axios from "axios";
import {useQuery} from "react-query";
import {getDateDDMMYYYY} from "@/Utils/convertDate.js";


export const getCommits = async (sha, page, since, until, author) =>{
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const owner = import.meta.env.VITE_GITHUB_OWNER;
    const repo = import.meta.env.VITE_GITHUB_REPO;
    let url = `https://api.github.com/repos/${owner}/${repo}/commits?`;

    //Couldn't add this as parameters as url doesn't accept empty parameters
    if(since){
        url += '&since=' + since;
    }
    if(until){
        url += '&until=' + until;
    }
    if(author){
        url += '&author=' + author;
    }

    //Parameters never empty
    const params = {
        page : page,
        per_page : "50",
        sha : sha,
    };
    try {
        const response =  await axios
            .get(url, {
                params: params,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        });

        //Extract the total number of pages from the Link header
        const linkHeader = response.headers.link;
        let totalPages = 1;
        if (linkHeader) {
            const lastPageUrl = linkHeader.split(',').find((link) => link.includes('rel="last"'));
            if (lastPageUrl) {
                const match = lastPageUrl.match(/page=(\d+)/);
                if (match) {
                    totalPages = parseInt(match[1]);
                }
            }
        }

        //Transform data to match the table
        const data = response.data.map((item) => ({
            author: item.commit.author.name,
            commitNumber: item.sha.slice(0, 7),
            message: item.commit.message,
            date: getDateDDMMYYYY(item.commit.author.date),
            url: item.html_url,
            totalPages : totalPages,
        }));

        return  data ;
    }
    catch (error) {
        console.log(error);
    }
}

export const useAllCommitsDetailsQuery = (sha, page, since, until, author) => {
    return useQuery(
        'commitDetails',
        () => getCommits(sha, page, since, until, author));
}