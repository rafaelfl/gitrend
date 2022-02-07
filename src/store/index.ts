import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gitRepositoryReducer from './features/gitRepository';
import gitUserReducer from './features/gitUser';

export const store = configureStore({
    reducer: {
        gitRepository: gitRepositoryReducer,
        gitUser: gitUserReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
