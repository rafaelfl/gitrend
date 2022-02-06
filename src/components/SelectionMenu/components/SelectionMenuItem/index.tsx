import { useMemo } from 'react';
import './styles.css';

interface SelectionMenuItemProps {
    label: string;
    value: string;
    checked?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SelectionMenuItem = ({ label, value, checked, onClick }: SelectionMenuItemProps): JSX.Element => {
    return (
        <button id={value} className="menu__item" onClick={onClick}>
            <i className="fas fa-check" style={checked ? { opacity: 1 } : { opacity: 0 }}></i> &nbsp; {label}
        </button>
    );
};
