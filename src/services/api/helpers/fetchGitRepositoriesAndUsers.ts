import { GenericMap, GitRepository, GitUser } from '../../../types';
import { FetchGitRepositoriesAndUsersResponse } from '../types';

export const fetchGitRepositoriesAndUsers = async (
    page: number,
    perPage: number,
    createDate: string,
): Promise<FetchGitRepositoriesAndUsersResponse> => {
    const fetchUrl = `https://api.github.com/search/repositories?q=created:%3E${createDate}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
        throw new Error('Error fetching git data');
    }

    const data = await response.json();

    const totalCount = data['total_count'];

    const gitRepositoryList: GitRepository[] = data.items.map((item: GenericMap) => {
        const repo: GitRepository = {
            id: item.id ?? '',
            name: item.name ?? '',
            fullName: item.full_name ?? '',
            isPrivate: item.private ?? false,
            htmlUrl: item.html_url ?? '',
            description: item.description ?? '',
            language: item.language ?? '',
            forksCount: item.forks_count ?? 0,
            starsCount: item.stargazers_count ?? 0,
        };

        return repo;
    });

    const gitUsersList: GitUser[] = data.items.map((item: GenericMap) => {
        const owner = item['owner'];

        const user: GitUser = {
            id: owner.id ?? '',
            username: owner.login ?? '',
            avatarUrl: owner.avatar_url ?? '',
            htmlUrl: owner.html_url ?? '',
        };

        return user;
    });

    return {
        totalCount,
        gitRepositoryList,
        gitUsersList,
    };
};
