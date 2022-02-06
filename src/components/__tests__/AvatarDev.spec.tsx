import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AvatarDev } from '..';
import testProfile from '../../assets/images/test-profile.jpg';
import octocatAvatar from '../../assets/images/octocat.svg';
import userEvent from '@testing-library/user-event';

describe('AvatarDev component tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match snapshot', () => {
        const { container } = render(<AvatarDev />);

        expect(container).toMatchSnapshot();
    });

    test('it should render an image as the dev test avatar', () => {
        const { getByRole, container } = render(<AvatarDev src={testProfile} />);

        const avatarContainer = container.querySelector('.avatar-container');
        const avatar = getByRole('button');

        expect(avatarContainer).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();

        expect(avatar).toHaveStyle(`background-image: url(${testProfile})`);
        expect(avatar).not.toHaveStyle(`background-image: url(${octocatAvatar})`);
    });

    test('it should render an image as octocat', () => {
        const { getByRole, container } = render(<AvatarDev />);

        const avatarContainer = container.querySelector('.avatar-container');
        const avatar = getByRole('button');

        expect(avatarContainer).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();

        expect(avatar).not.toHaveStyle(`background-image: url(${testProfile})`);
        expect(avatar).toHaveStyle(`background-image: url(${octocatAvatar})`);
    });

    test('it should call the onClick event', () => {
        const onClick = jest.fn();

        const { getByRole, container } = render(<AvatarDev onClick={onClick} />);

        const avatarContainer = container.querySelector('.avatar-container');
        const avatar = getByRole('button');

        expect(avatarContainer).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();

        userEvent.click(avatar);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
