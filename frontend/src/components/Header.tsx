import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthModalContext } from '../context/AuthModalContext';
import styles from '../styles/HeaderComponentStyles.module.css';
import { Button } from './FormComponents/Button';

export const Header = () => {
    const { setShowAuthModal } = useContext(AuthModalContext);
    const openModal = () => {
        setShowAuthModal(true);
    }
    const { user } = useContext(AuthContext);
    return (
        <header
            className={styles.mainContentHeader}
        >
            {
                user ?
                    (
                        <span
                            style={{color:'white'}}
                        >{user.userName}</span>
                    )
                    :
                    (
                        <Button
                            text='SIGN UP'
                            onClick={openModal}
                            className={styles.mainContentHeaderButton}
                        />

                    )
            }
        </header>
    );
}