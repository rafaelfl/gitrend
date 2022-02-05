import { CardRepository, SelectionMenu, Switch } from '../../../../components';
import searchIcon from '../../../../assets/images/search-icon.svg';
import './styles.css';
import { useState } from 'react';

export const SectionTrendingRepos = (): JSX.Element => {
    const languageList = [
        {
            label: 'C++',
            value: 'cpp',
        },
        {
            label: 'Dart',
            value: 'dart',
        },
        {
            label: 'Javascript',
            value: 'javascript',
        },
        {
            label: 'Typescript',
            value: 'typescript',
        },
    ];

    const cards = Array(10).fill(0);

    const [onlyFavorite, setOnlyFavority] = useState(false);

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
                        />
                        <img src={searchIcon} alt="search" />
                    </div>

                    <div className="favorite-filter">
                        <Switch
                            checked={onlyFavorite}
                            onChange={() => {
                                console.log('clicado', onlyFavorite);
                                setOnlyFavority(!onlyFavorite);
                            }}
                        />
                        <span>Show only favorites</span>
                    </div>

                    <SelectionMenu
                        selectedOptionLabel="Language:"
                        menuLabel="Select the language"
                        menuItems={languageList}
                    />
                </div>
            </div>
            <div className="trending-repos-container__grid">
                {cards.map((_, index) => (
                    <CardRepository
                        key={index}
                        title="microsoft / PowerToys"
                        // description="Windows system utilities to maximize productivity"
                        description="Small educational project developed with the objective of presenting the concepts related to the development of backend REST APIs with Node.js for the course Distributed Systems (2021.2) of the Computer Engineering Course - Federal University of Maranhão (UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)"
                        language="C#"
                        stars={67934}
                        forks={3816}
                        isFavorite={false}
                        url="https://github.com/microsoft/terminal"
                    />
                ))}
            </div>
        </section>
    );
};
