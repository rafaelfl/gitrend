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

    useEffect(() => {
        dispatch(fetchRepositoryData({}));
    }, []);

    const renderRepositoryList = useCallback(() => {
        if (statusRepositories === 'rejected') {
            return (
                <div style={{ width: '100%', fontSize: '1.5rem' }}>
                    An error occurred fetching the data from GitHub: {errorRepositories}
                </div>
            );
        }

        if (statusRepositories === 'loading') {
            return (
                <div style={{ width: '100%' }}>
                    <Loading />
                </div>
            );
        }

        return (
            <div className="trending-repos-container__grid">
                {repositoryList.map((repo, index) => (
                    <CardRepository
                        key={`${repo.id}-${index}`}
                        title={repo.name}
                        description={repo.description}
                        language={repo.language}
                        stars={repo.starsCount}
                        forks={repo.forksCount}
                        isFavorite={false}
                        url={repo.htmlUrl}
                    />
                ))}
            </div>
        );
    }, [repositoryList, errorRepositories, statusRepositories]);

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
            {renderRepositoryList()}
            <div className="trending-repos-container__footer">
                <PaginationBar maxPages={totalCountRepositories} pageNumber={pageNumber} />
            </div>
        </section>
    );
};
