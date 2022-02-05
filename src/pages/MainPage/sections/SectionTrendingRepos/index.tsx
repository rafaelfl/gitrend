import { CardRepository, SelectionMenu } from '../../../../components';
import searchIcon from '../../../../assets/images/search-icon.svg';
import './styles.css';

export const SectionTrendingRepos = (): JSX.Element => {
    const cards = Array(10).fill(0);

    return (
        <section className="trending-repos-container">
            <div className="trending-repos-container__header">
                <h2>Trending Repositories</h2>
                <div className="tools">
                    <div className="search-box">
                        <input type="search" className="search-box__input" placeholder="Search" />
                        <img src={searchIcon} alt="search" />
                    </div>

                    <SelectionMenu />
                </div>
            </div>
            <div className="trending-repos-container__grid">
                {cards.map((_, index) => (
                    <CardRepository
                        key={index}
                        name="microsoft / PowerToys"
                        description="Windows system utilities to maximize productivity"
                        language="C#"
                        stars={67934}
                        forks={3816}
                        isFavorite={true}
                    />
                ))}
            </div>
        </section>
    );
};
