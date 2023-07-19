import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavoriteRepository } from '..';
import { RootState } from '../../..';
import { appConfig } from '../../../../config';
import { GitRepository } from '../../../../types';

export const tagRepositoryAsFavorite = createAsyncThunk<Promise<void>, GitRepository, { state: RootState }>(
    'gitRepository/tagRepositoryAsFavorite',
    async (repository: GitRepository, { dispatch, getState }): Promise<void> => {
        try {
            // repositoryId does not exist in the loadedRepositoryList
            if (!repository?.id) {
                throw new Error('RepositoryId not found');
            }

            const favoritedRepository = { ...repository, isFavorite: true };

            // loads localStorage data
            let storageData: any;

            try {
                storageData = JSON.parse(localStorage.getItem(appConfig.favoriteRepositoriesKey) ?? '{}');
            } catch (error) {
                storageData = {};
            }

            // we add the repository to the local storage
            storageData[repository.id] = favoritedRepository;

            // we update the local storage
            localStorage.setItem(appConfig.favoriteRepositoriesKey, JSON.stringify(storageData));

            dispatch(addFavoriteRepository(favoritedRepository));
        } catch (error) {
            throw error;
        }
    },
);
