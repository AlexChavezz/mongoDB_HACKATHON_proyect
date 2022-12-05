import { useContext, useEffect, useState } from 'react';
import styles from '../styles/AuthContainerComponent.module.css';
import { AuthForm } from './FormComponents/AuthForm';
import { authState } from '../interfaces/intefaces';



export const AuthContainer = () => {

    const [authState, setAuthState] = useState<authState>("SIGN UP");
    const toggleAuthState = () => {
        setAuthState(authState === "SIGN IN" ? "SIGN UP" : "SIGN IN");
    }
    return (
        <section
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
                </header>
                <main
                    className={styles.authBody}
                >
                    <AuthForm 
                        authState={authState}
                    />
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
                    </div>
                </footer>
            </article>
        </section>
    );
}