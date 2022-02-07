import { GitRepository, GitUser } from '../../../types';

export interface FetchGitRepositoriesAndUsersResponse {
    totalCount: number;
    gitRepositoryList: GitRepository[];
    gitUsersList: GitUser[];
}
