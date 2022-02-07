import { SwitchContainer } from './styles';

interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
    description?: string;
}

export const Switch = ({ checked, disabled, onChange, description }: SwitchProps): JSX.Element => {
    return (
        <SwitchContainer
            data-testid="@Switch/container"
            tabIndex={0}
            aria-label={description ?? 'Switch button'}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onChange();
                }
            }}
        >
            <input
                type="checkbox"
                data-testid="@Switch/checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <span />
        </SwitchContainer>
    );
};
