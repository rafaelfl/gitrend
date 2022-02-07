import { useCallback } from 'react';
import { AvatarDev, Loading } from '../../../../components';
import { ListView } from '../../../../components/ListView';
import { useAppSelector } from '../../../../hooks';
import { selectRepositoryStoreError, selectRepositoryStoreStatus } from '../../../../store/features/gitRepository';
import { selectUserList } from '../../../../store/features/gitUser';
import { GitUser } from '../../../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import './styles.css';

export const SectionTrendingDevs = (): JSX.Element => {
    const statusRepositories = useAppSelector(selectRepositoryStoreStatus);
    const errorRepositories: string | undefined = useAppSelector(selectRepositoryStoreError);

    const usersList: GitUser[] = useAppSelector(selectUserList);

    const renderRepositoryList = useCallback(() => {
        if (statusRepositories === 'rejected') {
            return (
                <ErrorMessage
                    errorTitle="An error occurred fetching the data from GitHub:"
                    errorMessage={errorRepositories}
                />
            );
        }

        if (statusRepositories === 'loading') {
            return (
                <div style={{ width: '100%' }}>
                    <Loading />
                </div>
            );
        }

        if (usersList.length === 0) {
            return (
                <ErrorMessage
                    errorTitle="There are no trending developers at the moment."
                    errorMessage="Please change the search parameters and try again."
                    hideErrorIcon={true}
                />
            );
        }

        return (
            <ListView>
                {usersList.map((user, index) => (
                    <AvatarDev
                        key={`${user.id}-${index}`}
                        description={`GitHub of ${user.username}`}
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
