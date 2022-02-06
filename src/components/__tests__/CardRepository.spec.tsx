import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardRepository } from '..';

describe('CardRepository component tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const buildCardRepository = (
        title: string,
        description: string,
        language: string,
        stars: number,
        fork: number,
        isFavorite: boolean,
        url: string,
        onFavoriteClick?: () => void,
    ) => (
        <CardRepository
            title={title}
            description={description}
            language={language}
            stars={stars}
            forks={fork}
            isFavorite={isFavorite}
            onFavoriteClick={onFavoriteClick}
            url={url}
        />
    );

    test('it should match snapshot', () => {
        const { container } = render(
            buildCardRepository(
                'microsoft / PowerToys',
                'Small educational project developed with the objective of presenting the concepts related to the development of backend REST APIs with Node.js for the course Distributed Systems (2021.2) of the Computer Engineering Course - Federal University of Maranhão (UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)(UFMA)',
                'C#',
                67934,
                3816,
                true,
                'https://github.com/microsoft/terminal',
            ),
        );

        expect(container).toMatchSnapshot();
    });

    test('it should render the card with all info and truncated description', () => {
        const descText =
            'Small educational project developed with the objective of presenting the concepts related to the development of backend REST APIs with Node.js for the course Distributed Systems (2021.2) of the Computer Engineering Course - Federal University of Maranhão (UFMA)';

        const { getByText, getByRole } = render(
            buildCardRepository(
                'Microsoft / PowerToys',
                descText,
                'C#',
                67934,
                3816,
                true,
                'https://github.com/microsoft/terminal',
            ),
        );

        expect(getByText(/Microsoft/)).toBeInTheDocument();
        expect(getByText(/C#/)).toBeInTheDocument();
        expect(getByText(/67,934/)).toBeInTheDocument();
        expect(getByText(/3,816/)).toBeInTheDocument();
        expect(getByText('https://github.com/microsoft/terminal')).toBeInTheDocument();

        const descriptionDiv = getByText(/Small educational/);
        expect(descriptionDiv).toBeInTheDocument();

        // the description should be truncated
        const descriptionText = descriptionDiv.textContent;

        expect(descriptionText).not.toEqual(descText);
        expect(descriptionText).toHaveLength(250);

        const favoriteButton = getByRole('button');
        expect(favoriteButton).toBeInTheDocument();

        const favoriteIcon = favoriteButton.firstChild;
        expect(favoriteIcon).toHaveClass('fas', 'fa-heart', 'fa-lg');
        expect(favoriteIcon).not.toHaveClass('far');
    });

    test('it should change the favorite icon when the favorite button is clicked', () => {
        let favorite = false;

        const onFavoriteClick = jest.fn(() => (favorite = !favorite));

        const { getByRole, rerender } = render(
            buildCardRepository(
                'PowerToys',
                'Small educational project',
                'C#',
                67934,
                3816,
                favorite,
                'https://github.com/microsoft/terminal',
                onFavoriteClick,
            ),
        );

        const favoriteButton = getByRole('button');
        expect(favoriteButton).toBeInTheDocument();

        const favoriteIcon = favoriteButton.firstChild;
        expect(favoriteIcon).toHaveClass('far', 'fa-heart', 'fa-lg');
        expect(favoriteIcon).not.toHaveClass('fas');

        userEvent.click(favoriteButton);

        rerender(
            buildCardRepository(
                'PowerToys',
                'Small educational project',
                'C#',
                67934,
                3816,
                true,
                'https://github.com/microsoft/terminal',
            ),
        );

        expect(favoriteIcon).toHaveClass('fas', 'fa-heart', 'fa-lg');
        expect(favoriteIcon).not.toHaveClass('far');
    });
});
