import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '..';

describe('Switch component tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('it should match snapshot', () => {
        const checkedSwitch = render(<Switch checked={true} onChange={() => false} />);
        const uncheckedSwitch = render(<Switch checked={false} onChange={() => false} />);

        expect(checkedSwitch.container).toMatchSnapshot();
        expect(uncheckedSwitch.container).toMatchSnapshot();
    });

    test('it should change the checked state on click event', () => {
        let isChecked = false;

        const onChange = jest.fn(() => (isChecked = !isChecked));

        const { rerender, container } = render(<Switch checked={isChecked} onChange={onChange} />);

        const switchContainer = container;
        const checkbox = switchContainer.querySelector('input[type="checkbox"]') as Element;
        const spanCheckbox = switchContainer.querySelector('span');

        expect(switchContainer).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(spanCheckbox).toBeInTheDocument();

        userEvent.click(checkbox);

        expect(isChecked).toEqual(true);
        expect(onChange).toHaveBeenCalled();

        rerender(<Switch checked={isChecked} onChange={onChange} />);

        expect(checkbox).toBeChecked();
    });

    test('it should not change the checked state on click event because it is disabled', () => {
        let isChecked = false;

        const onChange = jest.fn(() => (isChecked = !isChecked));

        const { rerender, container } = render(<Switch checked={isChecked} disabled onChange={onChange} />);

        const switchContainer = container;
        const checkbox = switchContainer.querySelector('input[type="checkbox"]') as Element;
        const spanCheckbox = switchContainer.querySelector('span');

        expect(switchContainer).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(spanCheckbox).toBeInTheDocument();

        userEvent.click(checkbox);

        expect(isChecked).toEqual(false);
        expect(onChange).not.toHaveBeenCalled();

        rerender(<Switch checked={isChecked} onChange={onChange} />);

        expect(checkbox).not.toBeChecked();
    });

    test('it should change the checked state on enter keydown', () => {
        let isChecked = false;

        const onChange = jest.fn(() => {
            isChecked = !isChecked;
        });

        const { rerender, container } = render(<Switch checked={isChecked} onChange={onChange} />);

        const switchContainer = container;
        const checkbox = switchContainer.querySelector('input[type="checkbox"]') as Element;
        const spanCheckbox = switchContainer.querySelector('span');

        expect(switchContainer).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(spanCheckbox).toBeInTheDocument();

        fireEvent.keyDown(checkbox, { key: 'A' });
        fireEvent.keyDown(checkbox, { key: 'Enter' });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(isChecked).toEqual(true);

        rerender(<Switch checked={isChecked} onChange={onChange} />);

        expect(checkbox).toBeChecked();
    });
});
