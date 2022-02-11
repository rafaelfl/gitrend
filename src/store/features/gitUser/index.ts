import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { GitRepository, GitUser } from '../../../types';

/*
 * GitHub Users data
 */

export interface GitUserDataState {
    data: GitUser[];
}

export const initialState: GitUserDataState = {
    data: [],
};

const gitUserSlice = createSlice({
    name: 'gitUser',
    initialState,
    reducers: {
        userDataUpdate: (
            state: GitUserDataState,
            action: PayloadAction<{
                data: GitUser[];
            }>,
        ) => {
            state.data = action.payload.data;
        },
    },
});

export const { userDataUpdate } = gitUserSlice.actions;

export const selectUserList = (state: RootState) => state.gitUser.data;

export default gitUserSlice.reducer;
