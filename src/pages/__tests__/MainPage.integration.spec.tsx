import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MainPage from '../MainPage';

describe('Integration tests of the MainPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match the snapshot', async () => {
        const { container } = render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        expect(container).toMatchSnapshot();
    });

    test('it should fetch and load the data for any language (two repos)', async () => {
        const mockedWindowOpen = jest.fn();

        jest.spyOn(window, 'open').mockImplementation(mockedWindowOpen);

        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // any language filter is selected by default
        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: Any');

        // there is only one page
        expect(screen.getByText(/1 of 1/)).toBeInTheDocument();

        expect(screen.getByTestId('@PaginationBar/next-page')).toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/last-page')).toBeDisabled();

        // testing click on the dev button
        userEvent.click(screen.getAllByTestId('@AvatarDev/button')[0]);
        expect(mockedWindowOpen).toHaveBeenCalledTimes(1);
    });

    test('it should fetch and load the data for javascript language (navigation tests)', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // any language filter is selected by default
        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: Any');

        // select javascript language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByText('Javascript'));
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: Javascript');

        // first page
        expect(screen.getByText(/1 of 34/)).toBeInTheDocument();

        expect(screen.getByTestId('@PaginationBar/next-page')).not.toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/last-page')).not.toBeDisabled();

        // clicking in the next page button should load the next page with more 30 repos
        userEvent.click(screen.getByTestId('@PaginationBar/next-page'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // second page
        expect(screen.getByText(/2 of 34/)).toBeInTheDocument();

        // clicking in the next page button should return an error page
        userEvent.click(screen.getByTestId('@PaginationBar/next-page'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/Only the first 1000 search results are available/));

        // third page
        expect(screen.getByText(/3 of 34/)).toBeInTheDocument();
        expect(screen.getAllByText(/Only the first 1000 search results are available/)).toHaveLength(2);

        // clicking in the last page button should return an error page
        userEvent.click(screen.getByTestId('@PaginationBar/last-page'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/Only the first 1000 search results are available/));

        // 34th page
        expect(screen.getByText(/34 of 34/)).toBeInTheDocument();
        expect(screen.getAllByText(/Only the first 1000 search results are available/)).toHaveLength(2);

        // clicking in the previous page button should return an error page
        userEvent.click(screen.getByTestId('@PaginationBar/previous-page'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/Only the first 1000 search results are available/));

        // third page
        expect(screen.getByText(/33 of 34/)).toBeInTheDocument();
        expect(screen.getAllByText(/Only the first 1000 search results are available/)).toHaveLength(2);

        // clicking in the first page button should return an error page
        userEvent.click(screen.getByTestId('@PaginationBar/first-page'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // first page
        expect(screen.getByText(/1 of 34/)).toBeInTheDocument();

        expect(screen.getByTestId('@PaginationBar/next-page')).not.toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/last-page')).not.toBeDisabled();

        // clearing the search and reloading the page with default search params
        userEvent.click(screen.getByTestId('@ClearSearchFilters'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // any language filter is selected by default
        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: Any');
    });

    test('it should fetch and load the data for assembly language (no repo available)', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // select assembly language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByText('Assembly'));
        userEvent.type(screen.getByTestId('@SearchInput'), 'any repo');
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/Please change the search parameters and try again/));

        expect(screen.getByText(/0 of 0/)).toBeInTheDocument();

        expect(screen.getAllByText(/Please change the search parameters and try again/)).toHaveLength(2);
    });

    test('it should fetch and load the data for typescript language (error + empty response)', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // select assembly language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByText('Typescript'));
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/An error occurred fetching the data from GitHub/));

        expect(screen.getByText(/1 of 1/)).toBeInTheDocument();

        expect(screen.getAllByText(/An error occurred fetching the data from GitHub/)).toHaveLength(2);
    });

    test('it should fetch and load the data for dart language (200 ok + empty response)', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // select assembly language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByText('Dart'));
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByText(/An error occurred fetching the data from GitHub/));

        expect(screen.getByText(/1 of 1/)).toBeInTheDocument();

        expect(screen.getAllByText(/An error occurred fetching the data from GitHub/)).toHaveLength(2);
    });

    test('it should fetch and load the data for c++ and c# languages (filter test)', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(3);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(2);

        // select c++ language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByLabelText('Select C++ option'));
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(1);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(1);

        // any language filter is selected by default
        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: C++');

        // select c++ language and send an enter key to the search input
        userEvent.click(screen.getByTestId('@SelectionMenu/summary'));
        userEvent.click(screen.getByLabelText('Select C# option'));
        userEvent.type(screen.getByTestId('@SearchInput'), '{enter}');

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the default mock (for any language) returns three repos, but...
        expect(screen.getAllByTestId('@CardRepository/container')).toHaveLength(1);

        // one of the users are the same for two of them
        expect(screen.getAllByTestId('@AvatarDev/container')).toHaveLength(1);

        // any language filter is selected by default
        expect(screen.getByTestId('@SelectionMenu/summary')).toHaveTextContent('Language: C#');
    });

    test('it should tag the first repository as favorite and then filter it', async () => {
        render(
            <Provider store={store}>
                <MainPage />
            </Provider>,
        );

        // wait for the data to be fetched
        // one loader for the repositories and one for the users
        expect(screen.getAllByTestId('@Loading')).toHaveLength(2);

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@CardRepository/favorite'));

        // the default mock (for any language) returns three repos, but...
        await waitFor(() => expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3));

        // tag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // tag the third repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[2]);

        // untag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // verify the mocked localStorage
        expect(localStorage.__STORE__['favoriteRepositories']).not.toBeUndefined();
        // the favoriteRepositories + test + MSW
        expect(Object.keys(localStorage.__STORE__)).toHaveLength(3);

        const localStorageData: any[] = JSON.parse(localStorage.__STORE__['favoriteRepositories']);
        expect(localStorageData).toHaveLength(1);

        // saving an empty object in localStorage's array
        localStorageData.push({});

        localStorage.setItem('favoriteRepositories', JSON.stringify(localStorageData));

        // filter only the favorite repositories
        userEvent.click(screen.getByTestId('@Switch/container'));

        // there are only one favorite repository
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(1);

        // search fields disabled
        expect(screen.getByTestId('@SearchInput')).toBeDisabled();
        expect(screen.getByTestId('@ClearSearchFilters')).toBeDisabled();

        // try to click in the selection menu, but it will not affect (because it is disabled)
        userEvent.click(screen.getByLabelText('Select Any option'));

        // navigation is disabled while filtering the favorite repositories
        expect(screen.getByText(/0 of 0/)).toBeInTheDocument();

        expect(screen.getByTestId('@PaginationBar/first-page')).toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/previous-page')).toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/next-page')).toBeDisabled();
        expect(screen.getByTestId('@PaginationBar/last-page')).toBeDisabled();

        // disable the filter of favorite repositories
        userEvent.click(screen.getByTestId('@Switch/container'));

        // search fields enabled
        expect(screen.getByTestId('@SearchInput')).not.toBeDisabled();
        expect(screen.getByTestId('@ClearSearchFilters')).not.toBeDisabled();

        // clear the search fields and reload the repositories
        userEvent.click(screen.getByTestId('@ClearSearchFilters'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the repository is favorited
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3);
        expect(screen.getAllByTestId('@CardRepository/favorite')[2]?.firstChild).toHaveClass('fas fa-heart fa-lg');

        // saving an invalid string object in localStorage
        localStorage.setItem('favoriteRepositories', 'invalid string');

        // tag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // the repository is favorited
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3);
        expect(screen.getAllByTestId('@CardRepository/favorite')[0]?.firstChild).toHaveClass('fas fa-heart fa-lg');

        // saving an invalid string object in localStorage
        localStorage.setItem('favoriteRepositories', '');

        // untag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // the repository is not favorited
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3);
        expect(screen.getAllByTestId('@CardRepository/favorite')[0]?.firstChild).toHaveClass('far fa-heart fa-lg');

        // tag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // saving an invalid string object in localStorage
        localStorage.setItem('favoriteRepositories', 'invalid string');

        // untag the first repo as favorite
        userEvent.click(screen.getAllByTestId('@CardRepository/favorite')[0]);

        // the repository is not favorited
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3);
        expect(screen.getAllByTestId('@CardRepository/favorite')[0]?.firstChild).toHaveClass('far fa-heart fa-lg');

        // saving an invalid string object in localStorage
        localStorage.setItem('favoriteRepositories', 'invalid string');

        // clear the search fields and reload the repositories
        userEvent.click(screen.getByTestId('@ClearSearchFilters'));

        // wait for the repositories to be loaded
        await waitFor(() => screen.getAllByTestId('@Loading'));
        await waitFor(() => screen.getAllByTestId('@CardRepository/container'));

        // the repository is not favorited
        expect(screen.getAllByTestId('@CardRepository/favorite')).toHaveLength(3);
        expect(screen.getAllByTestId('@CardRepository/favorite')[0]?.firstChild).toHaveClass('far fa-heart fa-lg');

        // filter only the favorite repositories
        userEvent.click(screen.getByTestId('@Switch/container'));

        expect(screen.getByText(/0 of 0/)).toBeInTheDocument();
        expect(screen.getByText(/There are no favorite repositories!/)).toBeInTheDocument();
    });
});
