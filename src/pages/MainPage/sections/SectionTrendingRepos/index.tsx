import { CardRepository, Loading, SelectionMenu, Switch } from '../../../../components';
import searchIcon from '../../../../assets/images/search-icon.svg';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { appConfig } from '../../../../config';
import PaginationBar from './components/PaginationBar';
import {
    selectFavoriteRepositories,
    selectRepositoryList,
    selectRepositoryStoreError,
    selectRepositoryStoreStatus,
    selectTotalCountRepositories,
    fetchRepositoryData,
} from '../../../../store/features/gitRepository';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { GitRepository } from '../../../../types';
import { RepositoryList } from './components/RepositoryList';
import { OrderSelector } from '../../components/OrderSelector';
import { useDebounce } from '../../../../hooks/useDebounce';

type NavigationEventTypes = 'first' | 'previous' | 'next' | 'last';

export const SectionTrendingRepos = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const statusRepositories = useAppSelector(selectRepositoryStoreStatus);
    const errorRepositories: string | undefined = useAppSelector(selectRepositoryStoreError);

    const repositoryList: GitRepository[] = useAppSelector(selectRepositoryList);
    const totalCountRepositories: number = useAppSelector(selectTotalCountRepositories);

    const favoriteRepositories: { [repoId: string]: GitRepository } = useAppSelector(selectFavoriteRepositories);

    const [languageVal, setLanguageVal] = useState('any');
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce<string>(searchText, 500);

    const [pageNumber, setPageNumber] = useState(1);
    const [isDescendingOrder, setIsDescendingOrder] = useState(true);

    const [onlyFavorites, setOnlyFavorite] = useState(false);

    const clearSearchFilters = useCallback(() => {
        setLanguageVal('any');
        setIsDescendingOrder(true);
        setSearchText('');
    }, [setLanguageVal, setSearchText]);

    const handlePageNavigation = useCallback(
        (navEvent: NavigationEventTypes) => {
            let newPageNumber = pageNumber;

            switch (navEvent) {
                case 'first':
                    newPageNumber = 1;
                    break;
                case 'previous':
                    newPageNumber = pageNumber - 1;
                    break;
                case 'next':
                    newPageNumber = pageNumber + 1;
                    break;
                case 'last':
                    newPageNumber = Math.ceil(totalCountRepositories / appConfig.resultsPerPage);
                    break;
            }

            setPageNumber(newPageNumber);
            dispatch(
                fetchRepositoryData({
                    page: newPageNumber,
                    language: languageVal,
                    text: searchText,
                    isDesc: isDescendingOrder,
                }),
            );
        },
        [dispatch, pageNumber, totalCountRepositories, appConfig, setPageNumber, isDescendingOrder],
    );

    useEffect(() => {
        // fetch the data from GitHub API on page loaded
        dispatch(
            fetchRepositoryData({
                language: languageVal,
                text: debouncedSearchText,
                page: 1,
                isDesc: isDescendingOrder,
            }),
        );
    }, [dispatch, languageVal, debouncedSearchText, isDescendingOrder]);

    // search data after enter is typed in the search input
    const handleSearch = useCallback(() => {
        setPageNumber(1);
        dispatch(fetchRepositoryData({ language: languageVal, text: searchText, page: 1, isDesc: isDescendingOrder }));
    }, [dispatch, languageVal, searchText, pageNumber, isDescendingOrder]);

    return (
        <section className="trending-repos-container">
            <div className="trending-repos-container__header">
                <h2>Trending Repositories</h2>
                <div className="tools">
                    <div className="search-box" style={onlyFavorites ? { backgroundColor: '#e8e8e8' } : {}}>
                        <input
                            type="search"
                            className="search-box__input"
                            placeholder="Type and press enter to search..."
                            aria-label="Search input. Type and press enter to search"
                            value={searchText}
                            disabled={onlyFavorites}
                            data-testid="@SearchInput"
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <img src={searchIcon} alt="search" />
                    </div>

                    <SelectionMenu
                        selectedOptionLabel="Language:"
                        menuLabel="Select the language to search"
                        menuItems={appConfig.languageList}
                        selectedValue={languageVal}
                        onChange={(val) => setLanguageVal(val)}
                        description="Select the language to search"
                        disabled={onlyFavorites}
                    />

                    <OrderSelector
                        checked={isDescendingOrder}
                        onChange={() => setIsDescendingOrder(!isDescendingOrder)}
                    />

                    <button
                        data-testid="@ClearSearchFilters"
                        className="clear-button"
                        disabled={onlyFavorites}
                        onClick={() => {
                            clearSearchFilters();
                            dispatch(fetchRepositoryData({}));
                        }}
                    >
                        <i className="fas fa-times fa-lg clear-button__icon"></i> Clear search filters
                    </button>

                    <div className="favorite-filter">
                        <Switch
                            checked={onlyFavorites}
                            onChange={() => setOnlyFavorite(!onlyFavorites)}
                            description="Show only your favorite repositories"
                        />
                        <span>Show only favorites</span>
                    </div>
                </div>
            </div>
            <RepositoryList
                statusRepositories={statusRepositories}
                errorRepositories={errorRepositories}
                repositoryList={repositoryList}
                showOnlyFavorites={onlyFavorites}
                favoriteRepositories={favoriteRepositories}
            />
            <div className="trending-repos-container__footer">
                <PaginationBar
                    maxPages={Math.ceil(totalCountRepositories / appConfig.resultsPerPage)}
                    pageNumber={pageNumber}
                    disabled={onlyFavorites}
                    onClickFirstPage={() => handlePageNavigation('first')}
                    onClickPreviousPage={() => handlePageNavigation('previous')}
                    onClickNextPage={() => handlePageNavigation('next')}
                    onClickLastPage={() => handlePageNavigation('last')}
                />
            </div>
        </section>
    );
};
