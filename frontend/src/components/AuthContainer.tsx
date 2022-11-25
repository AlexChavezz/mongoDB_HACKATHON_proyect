import { useContext, useState } from 'react';
import styles from '../styles/AuthContainerComponent.module.css';
import closeIcon from '../assets/close_FILL0_wght400_GRAD0_opsz48.svg';
import { AuthModalContext } from '../context/AuthModalContext';
import { Button } from './Button';
import arrow from '../assets/arrow_right_alt_FILL0_wght400_GRAD0_opsz48.svg';

type authState = "SIGN IN" | "SIGN UP";

export const AuthContainer = () => {

    const [authState, setAuthState] = useState<authState>("SIGN UP");
    const { setShowAuthModal } = useContext(AuthModalContext);
    const closeModal = () => {
        setShowAuthModal(false);
    }
    const closeIf = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target.classList.contains('_authMainContainer_1til9_1'))
        {
            closeModal();
        }
    }
    const toggleAuthState = () => {
        setAuthState(authState === "SIGN IN" ? "SIGN UP" : "SIGN IN");
    }
    return (
        <section
            onClick={closeIf}
            className={styles.authMainContainer}
        >
            <article
                className={styles.authContainer}
            >
                <header
                    className={styles.authHeader}
                >
                    <h3
                        className={styles.authTitle}
                    >{authState}</h3>
                    <p
                        className={styles.headerText}
                    >
                        {
                            authState === "SIGN IN" ? "If you have an account you can sign in." : "If you do not have an account you can create one."
                        }
                    </p>
                    <img
                        onClick={closeModal}
                        src={closeIcon}
                        alt="close-icon"
                        className={styles.headerCloseIcon}
                    />
                </header>
                <main
                    className={styles.authBody}
                >

                </main>
                <footer
                    className={styles.authFooter}
                >
                    <div
                        className={styles.authFooterTextContainer}
                    >
                        <p>
                            {
                                authState === "SIGN UP" ? "Do you have an account?" : "Do you haven’t an account?`"
                            }
                        </p>
                        <span
                            className={styles.authFooterChangeState}
                            onClick={toggleAuthState}
                        >
                            {
                                authState === "SIGN UP" ? "Sign In" : "Sign Up" 
                            }
                        </span>
                    </div>
                    <div
                        className={styles.authFooterButtonContainer}
                    >
                        <Button 
                            text={authState}
                            onClick={()=>{}}
                            className={styles.authFooterButton}
                        >
                            <img src={arrow} alt="arrow" className={styles.authImageButton}/>
                        </Button>
                    </div>
                </footer>
            </article>
        </section>
    );
}