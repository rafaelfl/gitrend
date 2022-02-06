import { CardRepository, Loading } from '../../../../../../components';
import { GitRepository } from '../../../../../../types';
import { ErrorMessage } from '../../../../components/ErrorMessage';

import './styles.css';

interface RepositoryListProps {
    statusRepositories: string;
    errorRepositories: string | undefined;
    repositoryList: GitRepository[];
}

export const RepositoryList = ({ statusRepositories, errorRepositories, repositoryList }: RepositoryListProps) => {
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
};
