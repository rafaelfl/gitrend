import { LoadingContainer } from './styles';

interface LoadingProps {
    width?: number;
}

export const Loading = ({ width = 80 }: LoadingProps): JSX.Element => {
    return (
        <LoadingContainer data-testid="@Loading" width={width}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoadingContainer>
    );
};
