import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListView } from '..';
import { ScrollLeftButton, ScrollRightButton } from '../ListView/styles';

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

    test('it should call the scrollBy event when the ListView is scrolled', () => {
        const onWheel = jest.fn();
        window.HTMLElement.prototype.scrollBy = onWheel;

        const { getByTestId } = render(
            <ListView>
                <button>Button1</button>
                <button>Button2</button>
                <button>Button3</button>
            </ListView>,
        );

        const scrollSlots = getByTestId('@ListView/scrollSlot');

        expect(scrollSlots).toBeInTheDocument();

        fireEvent.wheel(scrollSlots, { deltaY: +100 });
        fireEvent.wheel(scrollSlots, { deltaY: -100 });

        expect(onWheel).toBeCalled();
    });

    test('it should change the visibility of the scroll buttons', () => {
        const onWheel = jest.fn();
        window.HTMLElement.prototype.scrollBy = onWheel;

        const { getAllByRole, rerender } = render(
            <div>
                <ScrollLeftButton visible={true} />
                <ScrollRightButton visible={true} />
            </div>,
        );

        const buttons = getAllByRole('button');

        expect(buttons).toHaveLength(2);

        expect(buttons[0]).toBeVisible();
        expect(buttons[1]).toBeVisible();

        rerender(
            <div>
                <ScrollLeftButton visible={false} />
                <ScrollRightButton visible={false} />
            </div>,
        );

        expect(buttons[0]).not.toBeVisible();
        expect(buttons[1]).not.toBeVisible();
    });
});
