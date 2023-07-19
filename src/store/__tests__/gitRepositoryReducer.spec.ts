// import counterReducer, { CounterState, increment, decrement, incrementByAmount } from './counterSlice';

import { RootState } from '..';
import reducer, {
    addFavoriteRepository,
    GitRepositoryDataState,
    removeFavoriteRepository,
    repositoryDataUpdate,
    selectFavoriteRepositories,
    selectRepositoryList,
    selectRepositoryStoreError,
    selectRepositoryStoreStatus,
    selectTotalCountRepositories,
} from '../features/gitRepository';

describe('gitRepository reducer tests', () => {
    const initialState: GitRepositoryDataState = {
        data: [],
        totalCountRepositories: 0,
        favoriteRepositories: {},
        error: undefined,
        status: 'idle',
    };

    const filledWithoutFavoriteState: GitRepositoryDataState = {
        data: [
            {
                id: '1',
                name: 'repo1',
                description: 'description1',
                isFavorite: false,
                forksCount: 1,
                fullName: 'fullName1',
                htmlUrl: 'htmlUrl1',
                starsCount: 10,
                isPrivate: false,
                language: 'typescript',
            },
            {
                id: '2',
                name: 'repo2',
                description: 'description2',
                isFavorite: false,
                forksCount: 5,
                fullName: 'fullName2',
                htmlUrl: 'htmlUrl2',
                starsCount: 20,
                isPrivate: false,
                language: 'cpp',
            },
        ],
        totalCountRepositories: 2,
        favoriteRepositories: {},
        error: undefined,
        status: 'idle',
    };

    const filledWithFavoriteState: GitRepositoryDataState = {
        data: [
            {
                id: '1',
                name: 'repo1',
                description: 'description1',
                isFavorite: false,
                forksCount: 1,
                fullName: 'fullName1',
                htmlUrl: 'htmlUrl1',
                starsCount: 10,
                isPrivate: false,
                language: 'typescript',
            },
            {
                id: '2',
                name: 'repo2',
                description: 'description2',
                isFavorite: true,
                forksCount: 5,
                fullName: 'fullName2',
                htmlUrl: 'htmlUrl2',
                starsCount: 20,
                isPrivate: false,
                language: 'cpp',
            },
        ],
        totalCountRepositories: 2,
        favoriteRepositories: {
            '2': {
                id: '2',
                name: 'repo2',
                description: 'description2',
                isFavorite: true,
                forksCount: 5,
                fullName: 'fullName2',
                htmlUrl: 'htmlUrl2',
                starsCount: 20,
                isPrivate: false,
                language: 'cpp',
            },
        },
        error: undefined,
        status: 'idle',
    };

    it('it should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('it should handle repositoryDataUpdate', () => {
        const actual = reducer(initialState, repositoryDataUpdate(filledWithoutFavoriteState));
        expect(actual).toEqual(filledWithoutFavoriteState);
    });

    it('it should handle addFavoriteRepository', () => {
        const actual = reducer(initialState, repositoryDataUpdate(filledWithoutFavoriteState));

        expect(actual?.data?.[1]).not.toBeUndefined();

        const actualWithFavorite = reducer(actual, addFavoriteRepository(actual.data[1]));

        expect(actualWithFavorite).toEqual(filledWithFavoriteState);
    });

    it('it should handle addFavoriteRepository with an existing repository', () => {
        const actual = reducer(initialState, repositoryDataUpdate(filledWithoutFavoriteState));

        expect(actual?.data?.[1]).not.toBeUndefined();

        const actualWithFavorite = reducer(actual, addFavoriteRepository(actual.data[1]));
        expect(actualWithFavorite).toEqual(filledWithFavoriteState);

        const nextWithFavorite = reducer(actualWithFavorite, addFavoriteRepository(actual.data[1]));
        expect(nextWithFavorite).toEqual(filledWithFavoriteState);
    });

    it('it should handle removeFavoriteRepository', () => {
        const actual = reducer(initialState, repositoryDataUpdate(filledWithFavoriteState));

        expect(actual?.data?.[1]).not.toBeUndefined();
        expect(actual.data[1]?.id).not.toBeUndefined();

        const actualWithoutFavorite = reducer(actual, removeFavoriteRepository(actual.data[1]));

        expect(actualWithoutFavorite).toEqual(filledWithoutFavoriteState);
    });

    it('it should select data from the store', () => {
        const actual = reducer(initialState, repositoryDataUpdate(filledWithFavoriteState));

        expect(selectRepositoryList({ gitRepository: actual } as RootState)).toEqual(filledWithFavoriteState.data);
        expect(selectTotalCountRepositories({ gitRepository: actual } as RootState)).toEqual(
            filledWithFavoriteState.totalCountRepositories,
        );
        expect(selectFavoriteRepositories({ gitRepository: actual } as RootState)).toEqual(
            filledWithFavoriteState.favoriteRepositories,
        );
        expect(selectRepositoryStoreStatus({ gitRepository: actual } as RootState)).toEqual(
            filledWithFavoriteState.status,
        );
        expect(selectRepositoryStoreError({ gitRepository: actual } as RootState)).toEqual(
            filledWithFavoriteState.error,
        );
    });
});
