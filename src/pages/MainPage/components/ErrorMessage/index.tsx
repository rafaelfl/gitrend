import './styles.css';

interface ErrorMessageProps {
    errorTitle: string;
    errorMessage: string | undefined;
    hideErrorIcon?: boolean;
}

export const ErrorMessage = ({ errorTitle, errorMessage, hideErrorIcon }: ErrorMessageProps): JSX.Element => {
    return (
        <div className="error-message">
            <h3 className="error-message__title">
                {!hideErrorIcon && (
                    <span className="error-message__title--red">
                        <i className="fas fa-times"></i>
                    </span>
                )}
                {` ${errorTitle}`}
            </h3>
            <p className="error-message__message">{errorMessage ?? ''}</p>
        </div>
    );
};
