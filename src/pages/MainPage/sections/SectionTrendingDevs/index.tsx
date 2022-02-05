import { AvatarDev } from '../../../../components';
import { ListView } from '../../../../components/ListView';
import './styles.css';

export const SectionTrendingDevs = (): JSX.Element => {
    return (
        <section className="trending-devs-container">
            <h2>Trending Developers</h2>
            <ListView>
                <AvatarDev src="https://avatars.githubusercontent.com/u/31193433?v=4" />
                <AvatarDev />
                <AvatarDev src="https://avatars.githubusercontent.com/u/31193433?v=4" />
                <AvatarDev />
            </ListView>
        </section>
    );
};
