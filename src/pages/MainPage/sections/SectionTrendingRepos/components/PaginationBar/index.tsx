import { appConfig } from '../../../../../../config';
import './styles.css';

interface PaginationBarProps {
    pageNumber: number;
    maxPages: number;
    onClickFirstPage?: () => void;
    onClickPreviousPage?: () => void;
    onClickNextPage?: () => void;
    onClickLastPage?: () => void;
}

const PaginationBar = ({
    pageNumber,
    maxPages,
    onClickFirstPage,
    onClickPreviousPage,
    onClickNextPage,
    onClickLastPage,
}: PaginationBarProps): JSX.Element => {
    return (
        <div className="pagination-bar">
            <span className="pagination-bar__label">{`${pageNumber} - ${appConfig.resultsPerPage} of ${maxPages}`}</span>
            <span className="pagination-bar__button-panel">
                <button
                    aria-label="Back to the first page"
                    className="pagination-bar__button"
                    disabled={pageNumber === 1}
                    onClick={onClickFirstPage}
                >
                    <i className="fas fa-angle-double-left fa-lg"></i>
                </button>
                <button
                    aria-label="Back to the previous page"
                    className="pagination-bar__button"
                    disabled={pageNumber === 1}
                    onClick={onClickPreviousPage}
                >
                    <i className="fas fa-angle-left fa-lg"></i>
                </button>
                <button
                    aria-label="Go to the next page"
                    className="pagination-bar__button"
                    disabled={pageNumber === maxPages}
                    onClick={onClickNextPage}
                >
                    <i className="fas fa-angle-right fa-lg"></i>
                </button>
                <button
                    aria-label="Go to the last page"
                    className="pagination-bar__button"
                    disabled={pageNumber === maxPages}
                    onClick={onClickLastPage}
                >
                    <i className="fas fa-angle-double-right fa-lg"></i>
                </button>
            </span>
        </div>
    );
};

export default PaginationBar;
