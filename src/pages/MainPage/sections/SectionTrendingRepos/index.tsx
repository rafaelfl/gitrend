import { CardRepository, SelectionMenu, Switch } from '../../../../components';
import searchIcon from '../../../../assets/images/search-icon.svg';
import './styles.css';
import { useCallback, useState } from 'react';
import { appConfig } from '../../../../config';
import PaginationBar from './components/PaginationBar';

export const SectionTrendingRepos = (): JSX.Element => {
    const cards = Array(10).fill(0);

    const maxPages = 1010101;

    const [languageVal, setLanguageVal] = useState('any');
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const [onlyFavorite, setOnlyFavorite] = useState(false);

    const clearSearchFilters = useCallback(() => {
        setLanguageVal('any');
        setSearchText('');
        setOnlyFavorite(false);
    }, [setLanguageVal, setSearchText, setOnlyFavorite]);

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
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <img src={searchIcon} alt="search" />
                    </div>

                    <SelectionMenu
                        selectedOptionLabel="Language:"
                        menuLabel="Select the language"
                        menuItems={appConfig.languageList}
                        selectedValue={languageVal}
                        onChange={(val) => setLanguageVal(val)}
                    />

                    <div className="clear-button" role="button" onClick={clearSearchFilters}>
                        <i className="fas fa-times fa-lg clear-button__icon"></i> Clear search filters
                    </div>

                    <div className="favorite-filter">
                        <Switch
                            checked={onlyFavorite}
                            onChange={() => {
                                console.log('clicado', onlyFavorite);
                                setOnlyFavorite(!onlyFavorite);
                            }}
                        />
                        <span>Show only favorites</span>
                    </div>
                </div>
            </div>
            <div className="trending-repos-container__grid">
                {cards.map((_, index) => (
                    <CardRepository
                        key={index}
                        title="microsoft / PowerToys"
                        description="Small educational project developed with the objective of presenting the concepts related to the development of backend REST APIs with Node.js for the course Distributed Systems (2021.2) of the Computer Engineering Course - Federal University of Maranhão (UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)"
                        language="C#"
                        stars={67934}
                        forks={3816}
                        isFavorite={false}
                        url="https://github.com/microsoft/terminal"
                    />
                ))}
            </div>
            <div className="trending-repos-container__footer">
                <PaginationBar maxPages={maxPages} pageNumber={pageNumber} />
            </div>
        </section>
    );
};
