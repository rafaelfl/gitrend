import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListView } from '..';

describe('ListView component tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match snapshot', () => {
        const { container } = render(
            <ListView>
                <button>Button1</button>
                <button>Button2</button>
                <button>Button3</button>
            </ListView>,
        );

        expect(container).toMatchSnapshot();
    });

    test('it should render a list of three buttons', () => {
        render(
            <ListView>
                <button>Button1</button>
                <button>Button2</button>
                <button>Button3</button>
            </ListView>,
        );

        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    test('it should call the onClick event of the last button', () => {
        const onClick = jest.fn();

        render(
            <ListView>
                <button onClick={onClick}>Button1</button>
                <button onClick={onClick}>Button2</button>
                <button onClick={onClick}>Button3</button>
            </ListView>,
        );

        const buttons = screen.getAllByRole('button');

        expect(buttons).toHaveLength(3);

        userEvent.click(buttons[2]);
        expect(onClick).toBeCalledTimes(1);
    });
});
