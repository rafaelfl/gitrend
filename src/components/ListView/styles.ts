import styled from 'styled-components';

export const ScrollingContainer = styled.div`
    position: relative;
    max-width: 100%;
`;

export const ScrollingWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 1rem 0;
    gap: 2rem;

    touch-action: pan-x;

    /* makes the effect of the scrolling "continuing" */
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

type ScrollRightButtonProps = {
    visible?: boolean;
};

export const ScrollRightButton = styled.button<ScrollRightButtonProps>`
    opacity: ${(props) => (props.visible === true ? 1 : 0)};
    visibility: ${(props) => (props.visible === true ? 'visible' : 'hidden')};
    position: absolute;
    left: 100%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    justify-content: center;
    border: 1px solid #555;
    border-radius: 50%;
    box-shadow: 0 0 12px 0 rgb(64 87 109 / 7%);
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
    background: #fff;
    transition-property: border-color, color, opacity, visibility;
    transition-duration: 0.2s;
    cursor: pointer;
`;

type ScrollLeftButtonProps = {
    visible?: boolean;
};

export const ScrollLeftButton = styled.button<ScrollLeftButtonProps>`
    opacity: ${(props) => (props.visible === true ? 1 : 0)};
    visibility: ${(props) => (props.visible === true ? 'visible' : 'hidden')};
    position: absolute;
    left: 0%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    justify-content: center;
    border: 1px solid #555;
    border-radius: 50%;
    box-shadow: 0 0 12px 0 rgb(64 87 109 / 7%);
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
    background: #fff;
    transition-property: border-color, color, opacity, visibility;
    transition-duration: 0.2s;
    cursor: pointer;
`;
