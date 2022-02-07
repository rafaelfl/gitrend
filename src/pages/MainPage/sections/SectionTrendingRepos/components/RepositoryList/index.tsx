import { useCallback } from 'react';
import { CardRepository, Loading } from '../../../../../../components';
import { useAppDispatch } from '../../../../../../hooks';
import {
    tagRepositoryAsFavorite,
    untagRepositoryAsFavorite,
} from '../../../../../../store/features/gitRepository/thunks';
import { GitRepository } from '../../../../../../types';
import { ErrorMessage } from '../../../../components/ErrorMessage';

import './styles.css';

interface RepositoryListProps {
    statusRepositories: string;
    errorRepositories: string | undefined;
    repositoryList: GitRepository[];
    showOnlyFavorites: boolean;
    favoriteRepositories: GitRepository[];
}

export const RepositoryList = ({
    statusRepositories,
    errorRepositories,
    repositoryList,
    showOnlyFavorites,
    favoriteRepositories,
}: RepositoryListProps) => {
    const dispatch = useAppDispatch();

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

    if (repositoryList.length === 0) {
        return (
            <ErrorMessage
                errorTitle="There are no trending repositories at the moment."
                errorMessage="Please change the search parameters and try again."
                hideErrorIcon={true}
            />
        );
    }

    const repoList = showOnlyFavorites ? favoriteRepositories : repositoryList;

    return (
        <div className="trending-repos-container__grid">
            {repoList.map((repo, index) => (
                <CardRepository
                    key={`${repo.id}-${index}`}
                    title={repo.name}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.starsCount}
                    forks={repo.forksCount}
                    isFavorite={repo.isFavorite}
                    url={repo.htmlUrl}
                    onFavoriteClick={() => {
                        if (!repo.isFavorite) {
                            dispatch(tagRepositoryAsFavorite(repo.id));
                        } else {
                            dispatch(untagRepositoryAsFavorite(repo.id));
                        }
                    }}
                />
            ))}
        </div>
    );
};
