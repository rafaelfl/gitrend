import { useCallback } from 'react';
import { AvatarDev, Loading } from '../../../../components';
import { ListView } from '../../../../components/ListView';
import { useAppSelector } from '../../../../hooks';
import { selectRepositoryStoreError, selectRepositoryStoreStatus } from '../../../../store/features/gitRepository';
import { selectUserList } from '../../../../store/features/gitUser';
import { GitUser } from '../../../../types';
import './styles.css';

export const SectionTrendingDevs = (): JSX.Element => {
    const statusRepositories = useAppSelector(selectRepositoryStoreStatus);
    const errorRepositories: string | undefined = useAppSelector(selectRepositoryStoreError);

    const usersList: GitUser[] = useAppSelector(selectUserList);

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
            <ListView>
                {usersList.map((user, index) => (
                    <AvatarDev
                        key={`${user.id}-${index}`}
                        description={`Repository of ${user.username}`}
                        name={user.username}
                        src={user.avatarUrl}
                        onClick={() => window.open(user.htmlUrl, '_blank', 'noreferrer')}
                    />
                ))}
            </ListView>
        );
    }, [usersList, errorRepositories, statusRepositories]);

    return (
        <section className="trending-devs-container">
            <h2>Trending Developers</h2>
            {renderRepositoryList()}
        </section>
    );
};
