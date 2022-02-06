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
}

export const SelectionMenu = ({
    selectedOptionLabel,
    menuLabel,
    menuItems,
    selectedValue,
    onChange,
}: SelectionMenuProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel = useMemo(() => {
        const selectedItem = menuItems.find((item) => item.value === selectedValue);
        return selectedItem ? selectedItem.label : '-';
    }, [selectedValue]);

    const onToggleMenu = useCallback(
        (e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
        },
        [setIsOpen, isOpen],
    );

    const handleClickItem = useCallback(
        (e) => {
            const value = e.target.id;
            onChange && onChange(value);
        },
        [onChange],
    );

    const menuRef = useRef<HTMLDetailsElement>(null);

    useOutsideClickDetector(menuRef, () => setIsOpen(false));

    return (
        <details className="select" ref={menuRef} open={isOpen} onClick={onToggleMenu}>
            <summary className="select__summary" role="button">
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
