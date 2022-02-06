import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gitRepositoryReducer from './features/gitRepository';

export const store = configureStore({
    reducer: {
        gitRepository: gitRepositoryReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
