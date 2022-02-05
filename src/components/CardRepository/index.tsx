interface CardRepositoryProps {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    isFavorite: boolean;
}

export const CardRepository = ({
    name,
    description,
    language,
    stars,
    forks,
    isFavorite,
}: CardRepositoryProps): JSX.Element => {
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                width: '100%',
                minHeight: 200,
                borderRadius: '1rem',
                backgroundColor: 'red',
            }}
        />
    );
};
