import { useMemo } from 'react';
import octocatAvatar from '../../assets/images/octocat.svg';
// import { AvatarButton } from './styles';
import './styles.css';

interface AvatarDevProps {
    name?: string;
    src?: string;
    description?: string;
    onClick?: () => void;
}

export const AvatarDev = ({ name, src, description, onClick }: AvatarDevProps): JSX.Element => {
    const backgroundImage = useMemo(() => src ?? octocatAvatar, [src]);
    return (
        <div className="avatar-container" data-testid="@AvatarDev/container">
            <button
                data-testid="@AvatarDev/button"
                className="avatar-container__button"
                aria-label={description ?? 'Repository Button'}
                style={{ backgroundImage: `url(${backgroundImage})` }}
                onClick={onClick}
            />
            {name && (
                <div data-testid="@AvatarDev/label" className="avatar-container__label">
                    {name}
                </div>
            )}
        </div>
    );
};
