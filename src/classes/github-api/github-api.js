import axios from 'axios';

class GithubApi {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://api.github.com"
        });

    }

    getUserList = () => {
        return this.axiosInstance.get(`/users`)
        .then(response => {
            return response.data
        });
    }

    getUser = (username) => {
        return this.axiosInstance.get(`/users/${username}`)
            .then(response => {
                return response.data
            });
    }

    getReposForUser = (username) => {
        return this.axiosInstance.get(`/users/${username}/repos`)
            .then(response => {
                return response.data
            });
    }

    getRepoDetails = (username, reposName) => {
        return this.axiosInstance.get(`repos/${username}/${reposName}`)
            .then(response => {
                return response.data
            });
    }

}

export default GithubApi;