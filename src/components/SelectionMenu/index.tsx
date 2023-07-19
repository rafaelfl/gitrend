import { useCallback, useMemo, useRef, useState } from 'react';
import { useOutsideClickDetector } from '../../hooks';
import { SelectionMenuItem } from './components/SelectionMenuItem';
import './styles.css';

type MenuItemProps = {
    label: string;
    value: string;
};

interface SelectionMenuProps {
    selectedOptionLabel: string;
    menuLabel: string;
    menuItems: MenuItemProps[];
    selectedValue: string;
    onChange?: (value: string) => void;
    description?: string;
    disabled?: boolean;
}

export const SelectionMenu = ({
    selectedOptionLabel,
    menuLabel,
    menuItems,
    selectedValue,
    onChange,
    description,
    disabled,
}: SelectionMenuProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel = useMemo(() => {
        const selectedItem = menuItems.find((item) => item.value === selectedValue);
        return selectedItem ? selectedItem.label : '-';
    }, [selectedValue]);

    const onToggleMenu = useCallback(
        (e: React.MouseEvent<HTMLDetailsElement>) => {
            e.preventDefault();

            if (!disabled) {
                setIsOpen((isOpen) => !isOpen);
            }
        },
        [setIsOpen, isOpen, disabled],
    );

    const handleClickItem = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const value = e.currentTarget.id;
            onChange?.(value);
        },
        [onChange],
    );

    const menuRef = useRef<HTMLDetailsElement>(null);

    useOutsideClickDetector(menuRef, () => setIsOpen(false));

    return (
        <details
            data-testid="@SelectionMenu/container"
            aria-label={description ?? 'Selection menu'}
            className="select"
            ref={menuRef}
            open={isOpen}
            style={disabled ? { opacity: 0.4 } : {}}
            onClick={onToggleMenu}
        >
            <summary data-testid="@SelectionMenu/summary" className="select__summary" role="button">
                {selectedOptionLabel} <span className="select__text">{selectedLabel}</span>
            </summary>

            <div className="menu">
                <div className="menu__content">
                    <p className="menu__label">{menuLabel}</p>
                    {menuItems.map((item) => (
                        <SelectionMenuItem
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            checked={selectedValue === item.value}
                            onClick={handleClickItem}
                        />
                    ))}
                </div>
            </div>
        </details>
    );
};
