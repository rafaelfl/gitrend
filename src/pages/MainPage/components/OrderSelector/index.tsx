import './styles.css';

interface CheckButtonProps {
    checked: boolean;
    onChange: () => void;
}

export const OrderSelector = ({ checked, onChange }: CheckButtonProps): JSX.Element => {
    return (
        <label htmlFor="order-selector" className="order-selector">
            <input
                id="order-selector"
                name="order-selector"
                type="checkbox"
                checked={!checked}
                onChange={onChange}
                className="order-selector__input"
            />
            <div className="order-selector__icon">
                <span className="icon icon__top"></span>
                <span className="icon icon__middle"></span>
                <span className="icon icon__bottom"></span>
            </div>
            <div className="order-selector__label order-selector__label--asc">ASC</div>
            <div className="order-selector__label order-selector__label--desc">DESC</div>
        </label>
    );
};
