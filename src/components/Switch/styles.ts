import styled from 'styled-components';

export const SwitchContainer = styled.label`
    --primary: #000000;
    --lightGrey: rgba(0, 0, 0, 0.05);
    --disabledGray: #d3d3d3;

    height: 24px;
    display: block;
    position: relative;
    cursor: pointer;

    input {
        display: none;

        & + span {
            padding-left: 42px;
            min-height: 24px;
            line-height: 24px;
            display: block;
            color: var(--lightGrey);
            position: relative;
            vertical-align: middle;
            white-space: nowrap;
            transition: color 0.5s ease;
            &:before,
            &:after {
                content: '';
                display: block;
                position: absolute;
                border-radius: 12px;
            }
            &:before {
                top: 0;
                left: 0;
                width: 42px;
                height: 24px;
                background: var(--lightGrey);
                transition: all 0.5s ease;
            }
            &:after {
                width: 18px;
                height: 18px;
                background: #fff;
                top: 3px;
                left: 3px;
                box-shadow: 0 1px 3px rgba(18, 22, 33, 0.1);
                transition: all 0.45s ease;
            }
        }

        &:checked {
            & + span {
                color: var(--primary);
                &:before {
                    background: var(--primary);
                }
                &:after {
                    background: #fff;
                    transform: translate(18px, 0);
                }
            }
        }

        &:disabled {
            & + span {
                &:before {
                    background: var(--disabledGray);
                }
                &:after {
                    background: #fff;
                }
            }
        }
    }
`;
