import { createAsyncThunk } from '@reduxjs/toolkit';
import { repositoryDataUpdate } from '..';
import { api } from '../../../../services';
import { GitRepository } from '../../../../types';
import { userDataUpdate } from '../../gitUser';

type fetchRepositoryDataParams = {
    page?: number;
    perPage?: number;
    createDate?: string;
    language?: string;
    text?: string;
};

export const fetchRepositoryData = createAsyncThunk(
    'gitRepository/fetchRepositoryData',
    async (
        { page = 1, perPage = 30, createDate = '2017-01-10', language = 'any', text = '' }: fetchRepositoryDataParams,
        { dispatch },
    ): Promise<void> => {
        try {
            const { totalCount, gitRepositoryList, gitUsersList } = await api.fetchGitRepositoriesAndUsers(
                page,
                perPage,
                createDate,
                language,
                text,
            );

            // updating data of the users (the repository owners)
            dispatch(userDataUpdate({ data: gitUsersList }));

            // updating data of the repositories
            dispatch(
                repositoryDataUpdate({
                    data: gitRepositoryList,
                    totalCountRepositories: totalCount,
                }),
            );
        } catch (error) {
            throw error;
        }
    },
);
