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
    onChange?: (value: string) => void;
}

export const SelectionMenu = ({
    selectedOptionLabel,
    menuLabel,
    menuItems,
    onChange,
}: SelectionMenuProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('any');

    const selectedLanguageLabel = useMemo(() => {
        const selectedItem = menuItems.find((item) => item.value === selectedLanguage);
        return selectedItem ? selectedItem.label : 'Any';
    }, [selectedLanguage]);

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
            setSelectedLanguage(value);

            onChange && onChange(value);
        },
        [setSelectedLanguage, onChange],
    );

    const menuRef = useRef<HTMLDetailsElement>(null);

    useOutsideClickDetector(menuRef, () => setIsOpen(false));

    return (
        <details className="select" ref={menuRef} open={isOpen} onClick={onToggleMenu}>
            <summary className="select__summary" role="button">
                {selectedOptionLabel} <span className="select__text">{selectedLanguageLabel}</span>
            </summary>

            <div className="menu">
                <div className="menu__content">
                    <p className="menu__label">{menuLabel}</p>
                    <SelectionMenuItem
                        label="Any"
                        value="any"
                        checked={selectedLanguage === 'any'}
                        onClick={handleClickItem}
                    />
                    {menuItems.map((item) => (
                        <SelectionMenuItem
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            checked={selectedLanguage === item.value}
                            onClick={handleClickItem}
                        />
                    ))}
                </div>
            </div>
        </details>
    );
};
