import { SwitchContainer } from './styles';

interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
}

export const Switch = ({ checked, disabled, onChange }: SwitchProps): JSX.Element => {
    return (
        <SwitchContainer>
            <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
            <span />
        </SwitchContainer>
    );
};
