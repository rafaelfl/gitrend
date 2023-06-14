import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavoriteRepository, removeFavoriteRepository } from '..';
import { RootState } from '../../..';
import { appConfig } from '../../../../config';
import { GitRepository } from '../../../../types';

export const untagRepositoryAsFavorite = createAsyncThunk<Promise<void>, GitRepository, { state: RootState }>(
    'gitRepository/untagRepositoryAsFavorite',
    async (repository: GitRepository, { dispatch, getState }): Promise<void> => {
        try {
            // repositoryId does not exist in the loadedRepositoryList
            if (!repository?.id) {
                throw new Error('RepositoryId not found');
            }

            // loads localStorage data
            let storageData: any;

            try {
                storageData = JSON.parse(localStorage.getItem(appConfig.favoriteRepositoriesKey) ?? '{}');
            } catch (error) {
                storageData = {};
            }

            delete storageData[repository.id];

            // we update the local storage
            localStorage.setItem(appConfig.favoriteRepositoriesKey, JSON.stringify(storageData));

            dispatch(removeFavoriteRepository(repository));
        } catch (error) {
            throw error;
        }
    },
);
