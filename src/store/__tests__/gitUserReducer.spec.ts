// import counterReducer, { CounterState, increment, decrement, incrementByAmount } from './counterSlice';

import { RootState } from '..';
import reducer, { userDataUpdate, GitUserDataState, selectUserList } from '../features/gitUser';

describe('gitUser reducer tests', () => {
    const initialState: GitUserDataState = {
        data: [],
    };

    const filledState: GitUserDataState = {
        data: [
            {
                id: '1',
                avatarUrl: 'avatarUrl1',
                username: 'username1',
                htmlUrl: 'htmlUrl1',
            },
            {
                id: '2',
                avatarUrl: 'avatarUrl2',
                username: 'username2',
                htmlUrl: 'htmlUrl2',
            },
        ],
    };

    it('it should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('it should handle repositoryDataUpdate', () => {
        const actual = reducer(initialState, userDataUpdate(filledState));
        expect(actual).toEqual(filledState);
    });

    it('it should select the users from the store', () => {
        const actual = reducer(initialState, userDataUpdate(filledState));

        expect(selectUserList({ gitUser: actual } as RootState)).toEqual(filledState.data);
    });
});
