import { FetchGitRepositoriesAndUsersResponse } from './types';
import { fetchGitRepositoriesAndUsers } from './helpers/fetchGitRepositories';

interface ApiService {
    fetchGitRepositoriesAndUsers: (
        page: number,
        perPage: number,
        createDate: string,
        language: string,
        text: string,
        desc: boolean,
    ) => Promise<FetchGitRepositoriesAndUsersResponse>;
}

export const api: ApiService = {
    fetchGitRepositoriesAndUsers: fetchGitRepositoriesAndUsers,
};
