import { useMemo } from 'react';
import octocatAvatar from '../../assets/images/octocat.svg';
// import { AvatarButton } from './styles';
import './styles.css';

interface AvatarDevProps {
    src?: string;
    onClick?: () => void;
}

export const AvatarDev = ({ src, onClick }: AvatarDevProps): JSX.Element => {
    const backgroundImage = useMemo(() => src ?? octocatAvatar, [src]);
    return (
        <div className="avatar-container">
            <button
                className="avatar-container__button"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                onClick={onClick}
            />
        </div>
    );
};
