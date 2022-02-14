import { HeaderContent, SectionTrendingDevs, SectionTrendingRepos } from './sections';
import './styles.css';

const MainPage = (): JSX.Element => {
    return (
        <div className="root-container">
            <header className="root-container__header">
                <HeaderContent />
            </header>
            <main className="root-container__content">
                <SectionTrendingDevs />
                <SectionTrendingRepos />
            </main>
            <footer className="root-container__footer">
                <span>Developed with 💜 by Rafael Fernandes Lopes</span>
            </footer>
        </div>
    );
};

export default MainPage;
