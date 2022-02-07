import './styles.css';

interface PaginationBarProps {
    pageNumber: number;
    maxPages: number;
    disabled?: boolean;
    onClickFirstPage?: () => void;
    onClickPreviousPage?: () => void;
    onClickNextPage?: () => void;
    onClickLastPage?: () => void;
}

const PaginationBar = ({
    pageNumber,
    maxPages,
    disabled,
    onClickFirstPage,
    onClickPreviousPage,
    onClickNextPage,
    onClickLastPage,
}: PaginationBarProps): JSX.Element => {
    return (
        <div className="pagination-bar" data-testid="@PaginationBar/container">
            <span className="pagination-bar__button-panel">
                <button
                    data-testid="@PaginationBar/first-page"
                    aria-label="Back to the first page"
                    className="pagination-bar__button"
                    disabled={pageNumber === 1 || maxPages === 0 || !onClickFirstPage || disabled}
                    onClick={onClickFirstPage}
                >
                    <i className="fas fa-angle-double-left fa-lg"></i>
                </button>
                <button
                    data-testid="@PaginationBar/previous-page"
                    aria-label="Back to the previous page"
                    className="pagination-bar__button"
                    disabled={pageNumber === 1 || maxPages === 0 || !onClickPreviousPage || disabled}
                    onClick={onClickPreviousPage}
                >
                    <i className="fas fa-angle-left fa-lg"></i>
                </button>

                <span className="pagination-bar__label" style={disabled ? { color: '#ccc' } : {}}>
                    {maxPages === 0 || disabled ? '0 of 0' : `${pageNumber} of ${maxPages}`}
                </span>

                <button
                    data-testid="@PaginationBar/next-page"
                    aria-label="Go to the next page"
                    className="pagination-bar__button"
                    disabled={pageNumber === maxPages || maxPages === 0 || !onClickNextPage || disabled}
                    onClick={onClickNextPage}
                >
                    <i className="fas fa-angle-right fa-lg"></i>
                </button>
                <button
                    data-testid="@PaginationBar/last-page"
                    aria-label="Go to the last page"
                    className="pagination-bar__button"
                    disabled={pageNumber === maxPages || maxPages === 0 || !onClickLastPage || disabled}
                    onClick={onClickLastPage}
                >
                    <i className="fas fa-angle-double-right fa-lg"></i>
                </button>
            </span>
        </div>
    );
};

export default PaginationBar;
