import { CardRepository, Loading, SelectionMenu, Switch } from '../../../../components';
import searchIcon from '../../../../assets/images/search-icon.svg';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { appConfig } from '../../../../config';
import PaginationBar from './components/PaginationBar';
import {
    selectRepositoryList,
    selectRepositoryStoreError,
    selectRepositoryStoreStatus,
    selectTotalCountRepositories,
} from '../../../../store/features/gitRepository';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { GitRepository } from '../../../../types';
import { fetchRepositoryData } from '../../../../store/features/gitRepository/thunks';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RepositoryList } from './components/RepositoryList';

type NavigationEventTypes = 'first' | 'previous' | 'next' | 'last';

export const SectionTrendingRepos = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const statusRepositories = useAppSelector(selectRepositoryStoreStatus);
    const errorRepositories: string | undefined = useAppSelector(selectRepositoryStoreError);

    const repositoryList: GitRepository[] = useAppSelector(selectRepositoryList);
    const totalCountRepositories: number = useAppSelector(selectTotalCountRepositories);

    const [languageVal, setLanguageVal] = useState('any');
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const [onlyFavorite, setOnlyFavorite] = useState(false);

    const clearSearchFilters = useCallback(() => {
        setLanguageVal('any');
        setSearchText('');
        setOnlyFavorite(false);
    }, [setLanguageVal, setSearchText, setOnlyFavorite]);

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

            if (newPageNumber >= 1 && newPageNumber <= Math.ceil(totalCountRepositories / appConfig.resultsPerPage)) {
                setPageNumber(newPageNumber);
                dispatch(fetchRepositoryData({ page: newPageNumber }));
            }
        },
        [pageNumber, totalCountRepositories, appConfig],
    );

    useEffect(() => {
        dispatch(fetchRepositoryData({}));
    }, []);

    return (
        <section className="trending-repos-container">
            <div className="trending-repos-container__header">
                <h2>Trending Repositories</h2>
                <div className="tools">
                    <div className="search-box">
                        <input
                            type="search"
                            className="search-box__input"
                            placeholder="Type and press enter to search..."
                            aria-label="Search input. Type and press enter to search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                    />

                    <button className="clear-button" onClick={clearSearchFilters}>
                        <i className="fas fa-times fa-lg clear-button__icon"></i> Clear search filters
                    </button>

                    <div className="favorite-filter">
                        <Switch
                            checked={onlyFavorite}
                            onChange={() => setOnlyFavorite(!onlyFavorite)}
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
            />
            <div className="trending-repos-container__footer">
                <PaginationBar
                    maxPages={Math.ceil(totalCountRepositories / appConfig.resultsPerPage)}
                    pageNumber={pageNumber}
                    onClickFirstPage={() => handlePageNavigation('first')}
                    onClickPreviousPage={() => handlePageNavigation('previous')}
                    onClickNextPage={() => handlePageNavigation('next')}
                    onClickLastPage={() => handlePageNavigation('last')}
                />
            </div>
        </section>
    );
};
