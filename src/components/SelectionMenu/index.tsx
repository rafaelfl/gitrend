import './styles.css';

export const SelectionMenu = (): JSX.Element => {
    return (
        <details className="language">
            <summary className="language__summary" role="button">
                Language: <span className="language__text">Any</span>
            </summary>

            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '2rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 400,
                    overflowY: 'scroll',
                }}
            >
                <button style={{ backgroundColor: 'transparent', border: 0 }}>TEste 1</button>
                <button style={{ backgroundColor: 'transparent', border: 0 }}>TEste 2</button>
                <button style={{ backgroundColor: 'transparent', border: 0 }}>TEste 3</button>
                <button style={{ backgroundColor: 'transparent', border: 0 }}>TEste 4</button>
            </div>
        </details>
    );
};
