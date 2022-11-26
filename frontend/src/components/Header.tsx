import { useContext } from 'react';
import { AuthModalContext } from '../context/AuthModalContext';
import styles from '../styles/HeaderComponentStyles.module.css';
import { Button } from './FormComponents/Button';

export const Header = () => {
    const { setShowAuthModal } = useContext(AuthModalContext);
    const openModal = () => {
        setShowAuthModal(true);
    }

    return (
        <header
            className={styles.mainContentHeader}
        >
            <Button
                text='SIGN UP'
                onClick={openModal}
                className={styles.mainContentHeaderButton}
            />
        </header>
    );
}