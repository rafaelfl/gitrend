import { createAsyncThunk } from '@reduxjs/toolkit';
import { repositoryDataUpdate } from '..';
import { appConfig } from '../../../../config';
import { api } from '../../../../services';
import { GitRepository } from '../../../../types';
import { userDataUpdate } from '../../gitUser';

type fetchRepositoryDataParams = {
    page?: number;
    perPage?: number;
    createDate?: string;
    language?: string;
    text?: string;
    isDesc?: boolean;
};

export const fetchRepositoryData = createAsyncThunk(
    'gitRepository/fetchRepositoryData',
    async (
        { page = 1, perPage = 30, createDate, language = 'any', text = '', isDesc = true }: fetchRepositoryDataParams,
        { dispatch },
    ): Promise<void> => {
        let dateStr: string = '';

        if (!createDate) {
            const d = new Date();
            d.setDate(d.getDate() - 7);

            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const day = d.getDate();

            dateStr = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
        } else {
            dateStr = createDate;
        }

        try {
            const { totalCount, gitRepositoryList, gitUsersList } = await api.fetchGitRepositoriesAndUsers(
                page,
                perPage,
                dateStr,
                language,
                text,
                isDesc,
            );

            // updating data of the users (the repository owners)
            dispatch(userDataUpdate({ data: gitUsersList }));

            //// loading favorite repositories from the local storage
            // read data from the localStorage
            let localStorageData;

            try {
                localStorageData = JSON.parse(localStorage.getItem(appConfig.favoriteRepositoriesKey) ?? '[]');
            } catch (e) {
                localStorageData = [];
            }

            // this conversion is done because the localStorage can be edited in the browser
            // so, in order to avoid any type errors, we convert the localStorageData to a GitRepository[]
            const updatedFavoriteRepositories = localStorageData.map((repo: any) => {
                const repository: GitRepository = {
                    id: repo.id ?? '',
                    name: repo.name ?? '',
                    description: repo.description ?? '',
                    fullName: repo.fullName ?? '',
                    htmlUrl: repo.htmlUrl ?? '',
                    forksCount: repo.forksCount ?? 0,
                    starsCount: repo.starsCount ?? 0,
                    isPrivate: repo.isPrivate ?? false,
                    language: repo.language ?? '',
                    isFavorite: true,
                };

                return repository;
            });

            // updating data of the repositories
            dispatch(
                repositoryDataUpdate({
                    data: gitRepositoryList,
                    totalCountRepositories: totalCount,
                    favoriteRepositories: updatedFavoriteRepositories,
                }),
            );
        } catch (error) {
            throw error;
        }
    },
);
