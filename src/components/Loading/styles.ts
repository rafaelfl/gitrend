import styled from 'styled-components';

type LoadingContainerProps = {
    width: number;
};

export const LoadingContainer = styled.div<LoadingContainerProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .lds-ring {
        display: inline-block;
        width: ${(props) => props.width}px;
        height: ${(props) => props.width}px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${(props) => props.width * 0.8}px;
        height: ${(props) => props.width * 0.8}px;
        margin: ${(props) => props.width * 0.1}px;
        border: ${(props) => props.width * 0.1}px solid #cef;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #cef transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
