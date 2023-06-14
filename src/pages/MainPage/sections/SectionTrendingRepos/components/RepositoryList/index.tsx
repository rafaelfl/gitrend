import { CardRepository, Loading } from '../../../../../../components';
import { useAppDispatch } from '../../../../../../hooks';
import { tagRepositoryAsFavorite, untagRepositoryAsFavorite } from '../../../../../../store/features/gitRepository';
import { GitRepository } from '../../../../../../types';
import { ErrorMessage } from '../../../../components/ErrorMessage';

import './styles.css';

interface RepositoryListProps {
    statusRepositories: string;
    errorRepositories: string | undefined;
    repositoryList: GitRepository[];
    showOnlyFavorites: boolean;
    favoriteRepositories: { [repoId: string]: GitRepository };
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

    const repoList = showOnlyFavorites
        ? Object.values(favoriteRepositories).sort((a, b) => a.name.localeCompare(b.name))
        : repositoryList;

    if (repoList.length === 0) {
        if (showOnlyFavorites) {
            return (
                <ErrorMessage
                    errorTitle="There are no favorite repositories!"
                    errorMessage="When you tag a repository, it will appear here."
                    hideErrorIcon={true}
                />
            );
        }

        return (
            <ErrorMessage
                errorTitle="There are no trending repositories at the moment"
                errorMessage="Please change the search parameters and try again."
                hideErrorIcon={true}
            />
        );
    }

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
                            dispatch(tagRepositoryAsFavorite(repo));
                        } else {
                            dispatch(untagRepositoryAsFavorite(repo));
                        }
                    }}
                />
            ))}
        </div>
    );
};
