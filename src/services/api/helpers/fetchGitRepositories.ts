import { GenericMap, GitRepository, GitUser } from '../../../types';
import { FetchGitRepositoriesAndUsersResponse } from '../types';

export const fetchGitRepositoriesAndUsers = async (
    page: number,
    perPage: number,
    createDate: string,
    language: string,
    text: string,
): Promise<FetchGitRepositoriesAndUsersResponse> => {
    let queryString = `language:${language} created:>${createDate}`;

    if (text?.trim()) {
        queryString += ` ${text} in:name,description,readme`;
    }

    const fetchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
        queryString,
    )}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;

    const response = await fetch(fetchUrl, {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/vnd.github.v3+json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        if (data['message']) {
            throw new Error(`${data['message']}. More info: ${data['documentation_url']}`);
        }

        throw new Error('Error fetching git data');
    }

    // GitHub api only supports the maximum of 1000 repositories
    const totalCount = data['total_count'] > 1000 ? 1000 : data['total_count'];

    const items: GenericMap[] = data['items'];

    // creating repository entities
    const gitRepositoryList: GitRepository[] = items.map((item: GenericMap) => {
        const repo: GitRepository = {
            id: `${item.id}`,
            name: item.name,
            fullName: item.full_name,
            isPrivate: item.private,
            htmlUrl: item.html_url,
            description: item.description,
            language: item.language,
            forksCount: item.forks_count,
            starsCount: item.stargazers_count,
            isFavorite: false,
        };

        return repo;
    });

    // creating user entities
    const gitUsersList: GitUser[] = items.reduce((acc: GitUser[], currentUser: GenericMap) => {
        const owner = currentUser['owner'];

        const user: GitUser = {
            id: `${owner.id}`,
            username: owner.login,
            avatarUrl: owner.avatar_url,
            htmlUrl: owner.html_url,
        };

        if (!acc.find((u: GitUser) => u.id === user.id)) {
            acc.push(user);
        }

        return acc;
    }, []);

    return {
        totalCount,
        gitRepositoryList,
        gitUsersList,
    };
};
