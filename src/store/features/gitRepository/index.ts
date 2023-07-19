import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { GitRepository } from '../../../types';
import { fetchRepositoryData } from './thunks';

/*
 * GitHub Repository data
 */

export type RequestState = 'idle' | 'loading' | 'rejected';

export interface GitRepositoryDataState {
    data: GitRepository[];
    totalCountRepositories: number;
    favoriteRepositories: { [repoId: string]: GitRepository };
    error: string | undefined;
    status: RequestState;
}

export const initialState: GitRepositoryDataState = {
    data: [],
    totalCountRepositories: 0,
    favoriteRepositories: {},
    error: undefined,
    status: 'idle',
};

const gitRepositorySlice = createSlice({
    name: 'gitRepository',
    initialState,
    reducers: {
        repositoryDataUpdate: (
            state: GitRepositoryDataState,
            action: PayloadAction<{
                data: GitRepository[];
                totalCountRepositories: number;
                favoriteRepositories: { [repoId: string]: GitRepository };
            }>,
        ) => {
            state.data = action.payload.data;
            state.totalCountRepositories = action.payload.totalCountRepositories;
            state.favoriteRepositories = action.payload.favoriteRepositories;

            // after updating the favorite repositories, we need to update the isFavorite data attributes
            state.data = state.data.map((repo: GitRepository) => {
                // if the favorite exists in the data, then we set the isFavorite to true
                const updatedRepo = action.payload.favoriteRepositories[repo.id];
                if (updatedRepo) {
                    return { ...repo, isFavorite: true };
                }

                return repo;
            });

            state.status = 'idle';
        },

        addFavoriteRepository: (state: GitRepositoryDataState, action: PayloadAction<GitRepository>) => {
            const payloadRepository = action.payload;

            // we add the repository to the favorite list
            state.favoriteRepositories[payloadRepository.id] = { ...action.payload, isFavorite: true };

            // update the isFavorite attribute of the data array
            state.data = state.data.map((repo: GitRepository) => {
                if (repo.id === payloadRepository.id) {
                    return { ...repo, isFavorite: true };
                }

                return repo;
            });
        },

        removeFavoriteRepository: (state: GitRepositoryDataState, action: PayloadAction<GitRepository>) => {
            const repository = action.payload;

            delete state.favoriteRepositories[repository.id];

            // update the isFavorite attribute of the data array
            state.data = state.data.map((repo: GitRepository) => {
                if (repo.id === repository.id) {
                    return { ...repo, isFavorite: false };
                }

                return repo;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepositoryData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRepositoryData.rejected, (state, { error }) => {
                state.status = 'rejected';
                state.error = error.message;
            });
    },
});

export const { repositoryDataUpdate, addFavoriteRepository, removeFavoriteRepository } = gitRepositorySlice.actions;

export * from './thunks';

export const selectRepositoryList = (state: RootState) => state.gitRepository.data;
export const selectTotalCountRepositories = (state: RootState) => state.gitRepository.totalCountRepositories;
export const selectFavoriteRepositories = (state: RootState) => state.gitRepository.favoriteRepositories;

export const selectRepositoryStoreStatus = (state: RootState) => state.gitRepository.status;
export const selectRepositoryStoreError = (state: RootState) => state.gitRepository.error;

export default gitRepositorySlice.reducer;
