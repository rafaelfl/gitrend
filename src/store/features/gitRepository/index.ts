import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { GitRepository } from '../../../types';
import { fetchRepositoryData } from './thunks';

/*
 * GitHub Repository data
 */

type RequestState = 'idle' | 'loading' | 'rejected';

interface GitRepositoryDataState {
    data: GitRepository[];
    totalCountRepositories: number;
    favoriteRepositories: GitRepository[];
    error: string | undefined;
    status: RequestState;
}

const initialState: GitRepositoryDataState = {
    data: [],
    totalCountRepositories: 0,
    favoriteRepositories: [],
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
                favoriteRepositories: GitRepository[];
            }>,
        ) => {
            state.data = action.payload.data;
            state.totalCountRepositories = action.payload.totalCountRepositories;
            state.favoriteRepositories = action.payload.favoriteRepositories;

            // after updating the favorite repositories, we need to update the isFavorite data attributes
            state.data = state.data.map((repo: GitRepository) => {
                // if the favorite exists in the data, then we set the isFavorite to true
                const updatedRepo = action.payload.favoriteRepositories.find(
                    (favoriteRepo: GitRepository) => repo.id === favoriteRepo.id,
                );

                if (updatedRepo) {
                    return { ...repo, isFavorite: true };
                }

                return repo;
            });

            state.status = 'idle';
        },

        addFavoriteRepository: (state: GitRepositoryDataState, action: PayloadAction<GitRepository>) => {
            const favoriteRepoIndex = state.favoriteRepositories.findIndex(
                (repo: GitRepository) => repo.id === action.payload.id,
            );

            // if the repository is already in the favorite list, we remove it
            if (favoriteRepoIndex >= 0) {
                state.favoriteRepositories.splice(favoriteRepoIndex, 1);
            }

            // we add the repository to the favorite list
            state.favoriteRepositories.push(action.payload);

            // update the isFavorite attribute of the data array
            state.data = state.data.map((repo: GitRepository) => {
                if (repo.id === action.payload.id) {
                    return { ...repo, isFavorite: true };
                }

                return repo;
            });
        },

        removeFavoriteRepository: (state: GitRepositoryDataState, action: PayloadAction<string>) => {
            const favoriteRepoIndex = state.favoriteRepositories.findIndex(
                (repo: GitRepository) => repo.id === action.payload,
            );

            // if the repository exists in the favorite list, we remove it
            if (favoriteRepoIndex >= 0) {
                state.favoriteRepositories.splice(favoriteRepoIndex, 1);
            }

            // update the isFavorite attribute of the data array
            state.data = state.data.map((repo: GitRepository) => {
                if (repo.id === action.payload) {
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

export const selectRepositoryList = (state: RootState) => state.gitRepository.data;
export const selectTotalCountRepositories = (state: RootState) => state.gitRepository.totalCountRepositories;
export const selectFavoriteRepositories = (state: RootState) => state.gitRepository.favoriteRepositories;

export const selectRepositoryStoreStatus = (state: RootState) => state.gitRepository.status;
export const selectRepositoryStoreError = (state: RootState) => state.gitRepository.error;

export default gitRepositorySlice.reducer;
