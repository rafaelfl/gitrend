import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Loading } from '..';

describe('Loading component tests', () => {
    test('it should match snapshot', () => {
        const { container } = render(<Loading />);

        expect(container).toMatchSnapshot();
    });

    test('it should render the loader with 80px as the default width and height', () => {
        const loaderSize = 80;

        const { container } = render(<Loading />);

        const loaderContainer = container;
        const loaderRing = loaderContainer.querySelector('.lds-ring');
        const loaderRingDiv = loaderRing?.querySelector('div');

        expect(loaderContainer).toBeInTheDocument();
        expect(loaderRing).toBeInTheDocument();
        expect(loaderRingDiv).toBeInTheDocument();

        expect(loaderRing).toHaveStyle(`width: ${loaderSize}px`);
        expect(loaderRing).toHaveStyle(`height: ${loaderSize}px`);

        expect(loaderRingDiv).toHaveStyle(`width: ${loaderSize * 0.8}px`);
        expect(loaderRingDiv).toHaveStyle(`height: ${loaderSize * 0.8}px`);

        expect(loaderRingDiv).toHaveStyle(`margin: ${loaderSize * 0.1}px`);
        expect(loaderRingDiv).toHaveStyle(`border: ${loaderSize * 0.1}px solid #cef`);
    });

    test('it should render the loader with 160px as width and height', () => {
        const loaderSize = 160;

        const { container } = render(<Loading width={loaderSize} />);

        const loaderContainer = container;
        const loaderRing = loaderContainer.querySelector('.lds-ring');
        const loaderRingDiv = loaderRing?.querySelector('div');

        expect(loaderContainer).toBeInTheDocument();
        expect(loaderRing).toBeInTheDocument();
        expect(loaderRingDiv).toBeInTheDocument();

        expect(loaderRing).toHaveStyle(`width: ${loaderSize}px`);
        expect(loaderRing).toHaveStyle(`height: ${loaderSize}px`);

        expect(loaderRingDiv).toHaveStyle(`width: ${loaderSize * 0.8}px`);
        expect(loaderRingDiv).toHaveStyle(`height: ${loaderSize * 0.8}px`);

        expect(loaderRingDiv).toHaveStyle(`margin: ${loaderSize * 0.1}px`);
        expect(loaderRingDiv).toHaveStyle(`border: ${loaderSize * 0.1}px solid #cef`);
    });
});
