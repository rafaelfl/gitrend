import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavoriteRepository, removeFavoriteRepository } from '..';
import { RootState } from '../../..';
import { appConfig } from '../../../../config';
import { GitRepository } from '../../../../types';

export const untagRepositoryAsFavorite = createAsyncThunk<Promise<void>, string, { state: RootState }>(
    'gitRepository/untagRepositoryAsFavorite',
    async (repositoryId: string, { dispatch, getState }): Promise<void> => {
        try {
            const { gitRepository } = getState();

            const loadedRepositoryList: GitRepository[] = gitRepository.data;
            const repositoryToUpdate: GitRepository | undefined = loadedRepositoryList.find(
                (repository) => repository.id === repositoryId,
            );

            // repositoryId does not exist in the loadedRepositoryList
            if (!repositoryToUpdate) {
                throw new Error('RepositoryId not found');
            }

            // loads localStorage data
            let localStorageData;

            try {
                localStorageData = JSON.parse(localStorage.getItem(appConfig.favoriteRepositoriesKey) ?? '[]');
            } catch (error) {
                localStorageData = [];
            }

            // if the repository is already in the local storage, we remove it
            const repositoryIndex = localStorageData.findIndex((repo: any) => repo.id === repositoryId);
            if (repositoryIndex >= 0) {
                localStorageData.splice(repositoryIndex, 1);
            }

            // we update the local storage
            localStorage.setItem(appConfig.favoriteRepositoriesKey, JSON.stringify(localStorageData));

            dispatch(removeFavoriteRepository(repositoryId));
        } catch (error) {
            throw error;
        }
    },
);
