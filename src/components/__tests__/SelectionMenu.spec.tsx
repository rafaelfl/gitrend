import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectionMenu } from '..';

describe('SelectionMenu component tests', () => {
    const onlyAnyOptionMenu = (
        <SelectionMenu selectedOptionLabel="Selected option:" menuLabel="Select one option" menuItems={[]} />
    );

    const threeOptionsMenu = (
        <SelectionMenu
            selectedOptionLabel="Selected option:"
            menuLabel="Select one option"
            menuItems={[
                {
                    label: 'Test1',
                    value: 'test1',
                },
                {
                    label: 'Test2',
                    value: 'test2',
                },
                {
                    label: 'Test3',
                    value: 'test3',
                },
            ]}
        />
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match snapshot', () => {
        const wrapperAny = render(onlyAnyOptionMenu);
        const wrapperFour = render(threeOptionsMenu);

        expect(wrapperAny.container).toMatchSnapshot();
        expect(wrapperFour.container).toMatchSnapshot();
    });

    test('it should render a closed menu with only the "any" option', () => {
        const { container } = render(onlyAnyOptionMenu);

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        // any option + the own menu
        expect(allButtons).toHaveLength(2);

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        expect(allButtons[0]).toHaveTextContent('Selected option: Any');
    });

    test('it should render a closed menu with three options', () => {
        const { container } = render(threeOptionsMenu);

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        // three options + any option + the own menu
        expect(allButtons).toHaveLength(5);

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        expect(allButtons[0]).toHaveTextContent('Selected option: Any');
    });

    test('it should show the menu when clicked', () => {
        const { container } = render(threeOptionsMenu);

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        userEvent.click(allButtons[0]);
        expect(rootDetails).toHaveAttribute('open');
    });

    test('it should change the selected option label when an option is clicked', () => {
        const { container } = render(threeOptionsMenu);

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        userEvent.click(allButtons[0]);
        expect(rootDetails).toHaveAttribute('open');

        // click in the first option: (menu > any > Test1)
        expect(allButtons?.[2]).not.toBeUndefined();

        userEvent.click(allButtons[2]);
        expect(allButtons[0]).toHaveTextContent('Selected option: Test1');
    });

    test('it should hide the menu when click outside', () => {
        const { container } = render(threeOptionsMenu);

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        userEvent.click(allButtons[0]);
        expect(rootDetails).toHaveAttribute('open');

        userEvent.click(container);
        expect(rootDetails).not.toHaveAttribute('open');
    });
});
