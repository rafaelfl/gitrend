import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectionMenu } from '..';

describe('SelectionMenu component tests', () => {
    const onlyAnyOptionMenu = (val: string, onChange?: (value: string) => void) => (
        <SelectionMenu
            selectedValue={val}
            onChange={onChange}
            selectedOptionLabel="Selected option:"
            menuLabel="Select one option"
            menuItems={[]}
        />
    );

    const threeOptionsMenu = (val: string, onChange?: (value: string) => void) => (
        <SelectionMenu
            selectedValue={val}
            onChange={onChange}
            selectedOptionLabel="Selected option:"
            menuLabel="Select one option"
            menuItems={[
                {
                    label: 'Any',
                    value: 'any',
                },
                {
                    label: 'Test1',
                    value: 'test1',
                },
                {
                    label: 'Test2',
                    value: 'test2',
                },
            ]}
        />
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match snapshot', () => {
        const wrapperAny = render(onlyAnyOptionMenu('any'));
        const wrapperFour = render(threeOptionsMenu('any'));

        expect(wrapperAny.container).toMatchSnapshot();
        expect(wrapperFour.container).toMatchSnapshot();
    });

    test('it should render a closed menu with no option', () => {
        const { getByText, container } = render(onlyAnyOptionMenu('any'));

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(getByText('Select one option')).toBeInTheDocument();

        // the own menu
        expect(allButtons).toHaveLength(1);

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        expect(allButtons[0]).toHaveTextContent('Selected option: -');
    });

    test('it should render a closed menu with three options', () => {
        const { container } = render(threeOptionsMenu('any'));

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        // three options + the own menu
        expect(allButtons).toHaveLength(4);

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        expect(allButtons[0]).toHaveTextContent('Selected option: Any');
    });

    test('it should show the menu when clicked', () => {
        const { container } = render(threeOptionsMenu('any'));

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(allButtons?.[0]).not.toBeUndefined();

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        userEvent.click(allButtons[0]);
        expect(rootDetails).toHaveAttribute('open');
    });

    test('it should change the selected option label when an option is clicked', () => {
        let selectedOption = 'any';
        const onChange = jest.fn((value: string) => (selectedOption = value));

        const { container, rerender } = render(threeOptionsMenu(selectedOption, onChange));

        const allButtons = screen.getAllByRole('button');
        const rootDetails = container.firstChild;

        expect(rootDetails).toHaveClass('select');
        expect(rootDetails).not.toHaveAttribute('open');

        // menu > any > test1 > test2
        expect(allButtons?.[3]).not.toBeUndefined();

        userEvent.click(allButtons[3]);
        rerender(threeOptionsMenu(selectedOption, onChange));

        expect(rootDetails).toHaveAttribute('open');

        expect(allButtons[0]).toHaveTextContent('Selected option: Test2');
    });

    test('it should hide the menu when click outside', () => {
        const { container } = render(threeOptionsMenu('any'));

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
