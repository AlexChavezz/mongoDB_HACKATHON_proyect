import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthModalContext } from '../context/AuthModalContext';
import styles from '../styles/HeaderComponentStyles.module.css';
import { Button } from './FormComponents/Button';
import userIcon from '../assets/person_FILL0_wght400_GRAD0_opsz48.svg';
import logoutIcon from '../assets/logout_FILL0_wght400_GRAD0_opsz48.svg';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
    const { setShowAuthModal } = useContext(AuthModalContext);
    const [littleModal, setLittleModal] = useState(false);
    const openModal = () => {
        setShowAuthModal(true);
    }
    const { logout } = useAuth();
    const { user } = useContext(AuthContext);
    return (
        <header
            className={styles.mainContentHeader}
        >
            {
                user ?
                    (
                        <span
                            className={styles.mainContentHeaderUser}
                            onClick={()=>setLittleModal(!littleModal)}
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
            {
                littleModal &&
                <div
                    className={styles.mainContentHeaderModal}
                    onClick={()=>{
                        setLittleModal(false);
                        logout();
                    }}
                >
                    <img 
                    className={styles.mainContentHeaderModalIcon}
                    src={logoutIcon} alt="logout-icon" />
                    <p
                        className={styles.mainContentHeaderModalText}
                    >Logout</p>
                </div>
            }
        </header>
    );
}