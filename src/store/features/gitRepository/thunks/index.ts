import { createAsyncThunk } from '@reduxjs/toolkit';
import { repositoryDataUpdate } from '..';
import { api } from '../../../../services';
import { GitRepository } from '../../../../types';

type fetchRepositoryDataParams = {
    page?: number;
    perPage?: number;
    createDate?: string;
};

export const fetchRepositoryData = createAsyncThunk(
    'gitRepository/fetchRepositoryData',
    async (
        { page = 1, perPage = 30, createDate = '2017-01-10' }: fetchRepositoryDataParams,
        { dispatch },
    ): Promise<void> => {
        try {
            const { totalCount, gitRepositoryList, gitUsersList } = await api.fetchGitRepositoriesAndUsers(
                page,
                perPage,
                createDate,
            );

            // TODO: load users data

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
