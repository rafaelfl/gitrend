import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { GitRepository } from '../../../types';
import { fetchRepositoryData } from './thunks';

/*
 * Repository data
 */
type RequestState = 'idle' | 'loading' | 'rejected';

interface GitRepositoryDataState {
    data: GitRepository[];
    totalCountRepositories: number;
    error: string | undefined;
    status: RequestState;
}

const initialState: GitRepositoryDataState = {
    data: [],
    totalCountRepositories: 0,
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
            }>,
        ) => {
            state.data = action.payload.data;
            state.totalCountRepositories = action.payload.totalCountRepositories;
            state.status = 'idle';
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

export const { repositoryDataUpdate } = gitRepositorySlice.actions;

export const selectRepositoryList = (state: RootState) => state.gitRepository.data;
export const selectTotalCountRepositories = (state: RootState) => state.gitRepository.totalCountRepositories;
export const selectRepositoryStoreStatus = (state: RootState) => state.gitRepository.status;
export const selectRepositoryStoreError = (state: RootState) => state.gitRepository.error;

export default gitRepositorySlice.reducer;
